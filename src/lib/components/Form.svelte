<!--@component
  Форма.
-->

<script module lang="ts">
  /** Импорты ***********************************************/

  import type { Snippet } from "svelte";
  import type { EventHandler, MouseEventHandler } from "svelte/elements";

  /** Интерфейсы ********************************************/

  /** Свойства компонента `Form` */
  export interface FormProps {
    /** Флаг, указывающий что кнопка подачи формы не активна */
    disabled?: boolean;
    /** Подпись */
    label: string;
    /** Подпись кнопки подачи формы */
    submitButtonLabel?: string;
    /** Функция обратного вызова при отмене */
    oncancel: MouseEventHandler<HTMLButtonElement>;
    /** Фунция обратного вызова при подаче формы */
    onsubmit: EventHandler<SubmitEvent, HTMLFormElement>;
    /** Содержание формы */
    children: Snippet;
  }
</script>

<script lang="ts">
  /** Импорты ***********************************************/

  import { Button, ErrorMessage } from "$lib/components";
  import * as m from '$lib/i18n/messages';

  /** Свойства **********************************************/

  const {
    disabled,
    label,
    submitButtonLabel = "Подтвердить",
    oncancel,
    onsubmit: userOnSubmit,
    children
  }: FormProps = $props();

  /** Свойства **********************************************/

  let errorMessage: string | null = $state("");
  let submitPromise: Promise<any> | null = $state(null);

  /** Константы *********************************************/

  const id = $props.id();

  /** Функции ***********************************************/

  /** Функция обратного вызова при подаче форма */
  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    submitPromise = userOnSubmit(event);
  };
</script>

<form {id} {onsubmit} class="w-full flex flex-col gap-8">
  <label for={id} class="mb-3 w-full typo-h5! text-center">
    {label}
  </label>

  {@render children()}

  {#if errorMessage}
    <ErrorMessage>{errorMessage}</ErrorMessage>
  {/if}

  <div class="mx-auto w-full max-w-sm grid grid-cols-2 gap-3">
    <Button colorScheme="neutral" size="medium" width="full" onclick={oncancel}>
      {m.cancel()}
    </Button>

    <Button {disabled} type="submit" size="medium" width="full">
      {#if submitPromise}
        {#await submitPromise}
          {m.processing()}
        {:then}
          {submitButtonLabel}
        {/await}
      {:else}
        {submitButtonLabel}
      {/if}
    </Button>
  </div>
</form>
