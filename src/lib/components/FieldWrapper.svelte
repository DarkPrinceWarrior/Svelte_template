<!--@component
  Обёртчик для полей ввода

  Отображает лейбл и границы поля, а также анимирует поле
  при появлении ошибки.
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import type { Snippet } from "svelte";
  import { fade, slide } from "svelte/transition";

  import { AnimatedText, ErrorMessage } from "$lib/components";

  import FieldLabel from "./FieldLabel.svelte";

  /** Интерфейсы ********************************************/

  /** Свойства компонента `FieldWrapper` */
  interface FieldWrapperProps {
    /** Идентефикатор поля ввода */
    id: string;
    /** Текст лейбла */
    label?: string;
    /** Флаг, указывающий что пользователь сфокусирован на поле */
    focused: boolean;
    /** Флаг, указывающий что поле ввода пустое */
    empty: boolean;
    /** Сообщение об ошибке */
    error?: string | null;
    /** Соедержимое */
    children: Snippet;
  }

  /** Свойства **********************************************/

  let {
    id,
    label,
    focused = $bindable(),
    empty = $bindable(),
    error = $bindable(),
    children
  }: FieldWrapperProps = $props();

  /** Состояния ********************************************/

  let wrapper: HTMLDivElement = $state() as HTMLDivElement;

  /** Эффекты ***********************************************/

  $effect(() => {
    if (!error) return;

    wrapper.classList.remove("animate-shake");
    void wrapper.offsetWidth;
    wrapper.classList.add("animate-shake");
  });
</script>

<div>
  <div
    class={[
      "border-2 border-t-transparent rounded-md box-border w-full h-max relative flex items-center bg-input-bg-enabled transition-colors duration-150",
      error && "border-red-700",
      focused && "border-primary-500",
      !empty && "border-neutral-500",
      !focused && empty && "border-transparent hover:border-neutral-300 "
    ]}
    bind:this={wrapper}
  >
    {#if label && (focused || !empty)}
      <div transition:fade={{ duration: 150 }} class="z-10">
        <FieldLabel {id} {label} bind:focused bind:empty bind:error />
      </div>
    {/if}

    {@render children()}
  </div>

  {#if error}
    <div transition:slide={{ duration: 50 }}>
      <ErrorMessage>
        {error}
      </ErrorMessage>
    </div>
  {/if}
</div>
