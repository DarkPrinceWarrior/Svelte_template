<!--@component
  Поле загрузки файлов
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import { bytesToString } from "$lib/utils";

  import { Button } from "$lib/components";

  import TrashIcon from "$lib/icons/TrashIcon.svelte";
  import UploadIcon from "$lib/icons/UploadIcon.svelte";
  import * as m from '$lib/i18n/messages';

  /** Типы **************************************************/

  /** Код ошибки */
  type ErrorCode = "too-big" | "wrong-format";

  /** Интерфейсы ********************************************/

  interface FileInputProps {
    /** Перечисление принимаемых форматов */
    accept: string;
    /** Флаг, указывающий что поле неактивно */
    disabled?: boolean;
    /** Список файлов */
    files: FileMeta[];
    /** Лейбл */
    label: string;
    /** Максимальный размер файла */
    maxSize: number;
    /** Максимальное кол-во файлов */
    maxFiles?: number;
    /** Флаг, указывающий что принимается несколько файлов */
    multiple?: boolean;
  }

  export interface FileMeta {
    file: File;
    preview?: string;
  }

  /** Свойства **********************************************/
  let {
    accept,
    disabled,
    files = $bindable([]),
    label,
    maxSize = 1,
    maxFiles = 1,
    multiple
  }: FileInputProps = $props();

  /** Константы *********************************************/

  const isManyFormats = accept.split(",").length > 1;

  /** Состояния *********************************************/

  let error: ErrorCode | null = $state(null);

  let wrapper: HTMLDivElement = $state() as HTMLDivElement;
  let inputEl: HTMLInputElement = $state() as HTMLInputElement;
  let isDragging = $state(false);

  /** Эффекты ***********************************************/

  $effect(() => {
    if (!error) return;

    wrapper.classList.remove("animate-shake");
    void wrapper.offsetWidth;
    wrapper.classList.add("animate-shake");
  });

  /** Функции ***********************************************/

  function resetPreview(f: FileMeta) {
    if (f.preview) {
      URL.revokeObjectURL(f.preview);
      f.preview = undefined;
    }
  }

  function matchesAccept(file: File, acceptStr: string) {
    if (!acceptStr) return true;
    const parts = acceptStr.split(",").map((p) => p.trim().toLowerCase());
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return parts.some((part) => {
      if (part.startsWith(".")) return name.endsWith(part);
      if (part.endsWith("/*")) return type.startsWith(part.slice(0, -1));
      return type === part;
    });
  }

  function addFilesFromList(fileList: FileList) {
    if (disabled) return;

    const incoming = Array.from(fileList).slice(
      0,
      Math.max(0, maxFiles - files.length)
    );

    incoming.forEach((f) => {
      const entry: FileMeta = {
        file: f,
        preview: undefined
      };

      if (f.size > maxSize) throw new Error("too-big");

      if (accept && !matchesAccept(f, accept)) throw new Error("wrong-format");

      if (f.type.startsWith("image/")) {
        entry.preview = URL.createObjectURL(f);
      }

      files = [...files, entry];
    });
  }

  function onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      error = null;
      try {
        addFilesFromList(target.files);
      } catch (e: any) {
        error = e.message as ErrorCode;
      }
      target.value = "";
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer && !disabled) {
      error = null;
      try {
        addFilesFromList(e.dataTransfer.files);
      } catch (e: any) {
        error = e.message as ErrorCode;
      }
    }
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) isDragging = true;
  }

  function onDragLeave(e: DragEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX >= rect.right ||
      e.clientY < rect.top ||
      e.clientY >= rect.bottom
    ) {
      isDragging = false;
    }
  }

  function removeFile(name: string) {
    const target = files.find((f) => f.file.name === name);
    if (target) resetPreview(target);
    files = files.filter((f) => f.file.name !== name);
  }
</script>

{#if files.length}
  <ul aria-live="polite" class="px-6 py-4 flex flex-col gap-4">
    {#each files as f (f)}
      <li class="flex items-center justify-between">
        <div class="flex gap-3">
          <div class="size-15 rounded-lg overflow-hidden">
            {#if f.preview}
              <img
                class="size-full object-cover"
                src={f.preview}
                alt="preview of {f.file.name}"
              />
            {:else}
              <div
                class="size-full flex items-center justify-center bg-neutral-100"
              >
                📄
              </div>
            {/if}
          </div>

          <div class="flex flex-col justify-between">
            <div>
              <p class="typo-xs! text-neutral-800/80">{label}</p>

              <p
                class="w-1/2 font-semibold truncate leading-none!"
                title={f.file.name}
              >
                {f.file.name}
              </p>
            </div>

            <p class="text-neutral-800/80 leading-none!">
              {bytesToString(f.file.size)}
            </p>
          </div>
        </div>

        <Button
          icon={TrashIcon}
          size="small"
          colorScheme="negative"
          onclick={() => removeFile(f.id)}
        ></Button>
      </li>
    {/each}
  </ul>
{:else}
  <div
    class="border border-dashed border-neutral-400 focus:border-primary-500 focus:outline-none rounded-xl px-6 py-10 transition-colors flex flex-col justify-between items-center gap-8 select-none"
    class:border-red-600={error !== null}
    class:bg-primary-100={isDragging}
    class:border-primary-500={isDragging}
    ondrop={onDrop}
    ondragover={onDragOver}
    ondragleave={onDragLeave}
    role="button"
    tabindex="0"
    aria-disabled={disabled}
    aria-label={m.file_upload_area()}
    onkeydown={(e) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputEl?.click();
      }
    }}
    bind:this={wrapper}
  >
    <div
      class="size-6 fill-neutral-900! transition-colors duration-150"
      class:fill-primary-500!={isDragging}
    >
      <UploadIcon />
    </div>

    <div class="flex flex-col items-center gap-2">
      <p
        class={[
          "typo-xs! text-neutral-800/80 transition-colors duration-150",
          isDragging && "text-primary-800/56"
        ]}
      >
        {label}
      </p>

      <p
        class="font-semibold transition-colors duration-150"
        class:text-primary-500={isDragging}
      >
        {m.select_or_drag_files()}
      </p>

      <p
        class={[
          "text-neutral-800/80 transition-colors duration-150",
          isDragging && "text-primary-800/56"
        ]}
      >
        <span class:text-red-600={error === "wrong-format"}>
          {accept.replaceAll(".", "").toUpperCase()}
        </span>

        {isManyFormats ? m.formats() : m.format()}

        <span class:text-red-600={error === "too-big"}>
          до {bytesToString(maxSize * 1024 * 1024)}
        </span>
      </p>
    </div>

    <Button
      colorScheme={isDragging ? "secondary" : "neutral"}
      size="small"
      onclick={(e) => {
        e.preventDefault();
        if (!disabled) inputEl?.click();
      }}
      {disabled}
    >
      Выбрать файл
    </Button>

    <input
      bind:this={inputEl}
      class="hidden"
      type="file"
      {accept}
      {multiple}
      {disabled}
      onchange={onInputChange}
    />
  </div>
{/if}
