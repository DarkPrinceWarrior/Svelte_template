<!--@component
  Выборщик с выпадающим списком
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import { slide } from "svelte/transition";

  import { DownIcon } from "$lib/icons";

  import FieldWrapper from "./FieldWrapper.svelte";

  /** Интерфейсы ********************************************/

  /** Опция. */
  interface DropdownSelectorOption {
    /** Лейбл, отображающийся в спике опций. */
    label: string;
    /** Объект, соответсвующий опции. */
    value: any;
  }

  /** Свойства компонента `DropdownSelector`. */
  interface DropdownSelectorProps {
    /** Список возможных опций. */
    options: DropdownSelectorOption[];
    /** Объект, соответствующий выбранной опции. */
    value: any | null;
    /** Лейбл. */
    label?: string;
    /**
     * Строка-заместитель. Отображается в поле селектора, когда
     * не выбрана ни одна опция.
     */
    placeholder?: string;
  }

  /** Интерфейсы ********************************************/

  let {
    label,
    options,
    value = $bindable(null),
    placeholder = "Выберите опцию..."
  }: DropdownSelectorProps = $props();

  /** Константы *********************************************/

  const id = $props.id();

  /** Состояния *********************************************/

  let displayOptions = $state(false);
  let searchQuery = $state("");
  let dropdownEl: HTMLDivElement = $state() as HTMLDivElement;
  let searchInputRef: HTMLInputElement | undefined = $state();

  /** Производные состояния *********************************/

  let empty = $derived(value === null);
  let focused = $state(false);

  let filteredOptions = $derived(
    searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options
  );

  /** Эффекты ***********************************************/

  $effect(() => {
    if (displayOptions) {
      searchQuery = "";

      setTimeout(() => searchInputRef?.focus(), 10);

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    } else {
      document.removeEventListener("click", handleClickOutside);

      focused = false;
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  /** Функции ***********************************************/

  function handleClickOutside(event: MouseEvent) {
    if (!dropdownEl.contains(event.target as Node)) {
      displayOptions = false;
    }
  }
</script>

<div bind:this={dropdownEl}>
  <div class="relative z-10">
    <FieldWrapper {id} {label} bind:empty bind:focused>
      <div
        class="px-4 py-3 size-full gap-1 focus:outline-none overflow-hidden cursor-pointer"
        role="button"
        tabindex="0"
        onclick={() => (displayOptions = !displayOptions)}
        onfocusin={() => (focused = true)}
        onfocusout={() => (focused = false)}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            displayOptions = !displayOptions;
          }
        }}
      >
        <div class="size-full flex">
          {#if displayOptions}
            <input
              type="text"
              bind:value={searchQuery}
              bind:this={searchInputRef}
              placeholder="Поиск..."
              class="w-full focus:outline-none leading-none"
            />
          {:else}
            <p
              class="w-full line-clamp-1 leading-none!"
              class:text-neutral-500={value === null}
            >
              {value !== undefined && value !== null
                ? options.find((opt) => opt.value === value)?.label ||
                  placeholder
                : placeholder}
            </p>
          {/if}

          <div
            class="transition-transform duration-200"
            class:rotate-180={displayOptions}
          >
            <DownIcon />
          </div>
        </div>
      </div>
    </FieldWrapper>
  </div>

  {#if displayOptions}
    <div
      transition:slide={{ duration: 150 }}
      class="rounded-b-lg px-2 pt-3 pb-2 size-full -translate-y-1 bg-neutral-100"
    >
      <ul class="w-full max-h-32 flex flex-col gap-2">
        {#each filteredOptions as { label, value: optionValue } (label)}
          <li>
            <button
              type="button"
              onclick={() => {
                value = optionValue;
                displayOptions = false;
              }}
              tabindex="0"
              disabled={value === optionValue}
              class="rounded-lg p-3 size-full disabled:bg-primary-800/12 enabled:hover:bg-neutral-800/5 disabled:text-primary-500 text-left leading-none cursor-pointer disabled:cursor-not-allowed transition-colors duration-150"
            >
              {label}
            </button>
          </li>
        {:else}
          <li>
            <p class="p-2 text-center text-black-bright">Ничего не найдено</p>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
