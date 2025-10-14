<!--@component
  Текстовое поле ввода.
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import type { Component } from "svelte";

  import { EyeSlashIcon, EyeIcon } from "$lib/icons";

  import FieldWrapper from "./FieldWrapper.svelte";
  import * as m from '$lib/i18n/messages';

  /** Интерфейсы ********************************************/

  /** Свойства компонента `TextInput` */
  export interface TextInputProps {
    /** Лейбл */
    label?: string;
    /** Местозаместитель */
    placeholder?: string;
    /** Флаг необходимости */
    required?: boolean;
    /** Флаг безопасного отображения */
    secure?: boolean;
    /** Максимальная длинна строки */
    maxlength?: number;
    /** Значение поля ввода */
    value: string;
  }

  /** Свойства **********************************************/

  let {
    label,
    placeholder,
    required = false,
    secure = false,
    maxlength,
    value = $bindable()
  }: TextInputProps = $props();

  /** Константы *********************************************/

  const ID: string = $props.id();

  /** Состояния *********************************************/

  let focused = $state(false);
  let error: string | null = $state(null);

  let Icon: Component = $state(EyeIcon);
  let inputElement: HTMLInputElement = $state() as HTMLInputElement;
  let hideValue = $state(secure);

  /** Производные состояния *********************************/

  let empty = $derived(value === "");
</script>

<div class="flex flex-col gap-2">
  <FieldWrapper id={ID} {label} bind:focused bind:empty bind:error>
    <button
      type="button"
      class="px-4 py-3 size-full relative flex items-center gap-1 cursor-text"
      onclick={() => inputElement?.focus()}
    >
      <span class="text-[0px]">{m.focus_on_input_field()}</span>

      <input
        id={ID}
        type={hideValue ? "password" : "text"}
        class="size-full focus:outline-none text-input-content-enabled caret-input-content-enabled"
        {placeholder}
        {required}
        {maxlength}
        bind:value
        bind:this={inputElement}
        onfocus={() => (focused = true)}
        onblur={() => (focused = false)}
      />
    </button>

    {#if secure}
      <button
        type="button"
        onclick={() => {
          hideValue = !hideValue;
          Icon = hideValue ? EyeIcon : EyeSlashIcon;
        }}
        class="group mr-2 flex justify-center items-center cursor-pointer"
      >
        <span class="text-[0px]">{m.toggle_hidden_text()}</span>

        <div
          class="size-6 fill-neutral-900! group-hover:fill-primary-500! stroke-neutral-900! group-hover:stroke-primary-500! transition-colors duration-150"
        >
          <Icon />
        </div>
      </button>
    {/if}
  </FieldWrapper>

  {#if maxlength}
    <p class="typo-sm! text-right text-neutral-800/50">
      {value.length}/{maxlength} {m.characters()}
    </p>
  {/if}
</div>
