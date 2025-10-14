<!--@component
  Линия прогресса.
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  /** Интерфейсы ********************************************/

  /** Свойсват компонента `ProgressBar` */
  interface ProgressBarProps {
    /** Уровень прогресса */
    value: number;
    /** Максимальный уровень прогресса */
    max: number;
    /** Функция форматирования значения при отображении */
    format?: (value: number) => string;
  }

  /** Свойства **********************************************/

  let {
    value = $bindable(),
    max,
    format = (v) => Math.floor(v).toString()
  }: ProgressBarProps = $props();

  /** Состояния *********************************************/

  const displayedValue = new Tween(0, {
    duration: 500,
    easing: cubicOut
  });

  /** Эффекты ***********************************************/

  /** Обновляет целевое значение `displayedValue` при изменении `value` */
  $effect(() => {
    displayedValue.target = value;
  });
</script>

<div class="w-full flex flex-col">
  <div class="flex justify-between">
    <p
      class="text-primary-500 text-right font-medium"
      style="width: {(displayedValue.current / max) * 100}%;"
    >
      {format(displayedValue.current)}
    </p>

    <p class="text-primary-800/22 text-right font-medium">
      {format(max - displayedValue.current)}
    </p>
  </div>

  <progress class="mt-1" value={displayedValue.current} {max}></progress>
</div>

<style>
  @reference '$lib/styles/global.css';

  progress {
    @apply w-full h-1;

    &::-webkit-progress-value {
      @apply rounded-l-full bg-primary-500;
    }

    &::-webkit-progress-bar {
      @apply rounded-r-full bg-primary-800/12;
    }
  }
</style>
