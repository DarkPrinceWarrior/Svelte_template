<!--@component
  Круг прогресса.
-->

<script module lang="ts">
  import type { Snippet } from "svelte";

  /** Свойства компонента `ProgressCircle` */
  export interface ProgressCircleProps {
    /** Содержание круга */
    children?: any;
    /** Значение */
    value: number;
    /** Максимальное значение */
    max: number;
    /** Ширина обводки */
    strokeWidth?: number;
  }
</script>

<script lang="ts">
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const {
    children,
    value,
    max,
    strokeWidth = 14
  }: ProgressCircleProps = $props();

  const valueTween = new Tween(0, { duration: 750, easing: cubicOut });
  const minProgressThreshold = 0.05;
  const maxProgressThreshold = 0.9;

  $effect(() => {
    valueTween.target = value;
  });

  /** Генерирует круговой путь для отображения прогресса */
  function generateProgressPath({
    value,
    max,
    strokeWidth
  }: ProgressCircleProps): string {
    if (value <= minProgressThreshold) {
      return "";
    }

    // Радиус круга зависит от ширины обводки
    const radius = 50 - strokeWidth / 2;
    const startY = 50 - radius;

    if (value >= max) {
      return `M50,${startY}A${radius} ${radius} 0 1 1 ${50 - 0.0001},${startY}`;
    }

    let progress = value / max;
    if (progress < 1) progress = maxProgressThreshold;

    const angle = Math.PI * 2 * progress;
    const x = 50 + Math.cos(angle - Math.PI / 2) * radius;
    const y = 50 + Math.sin(angle - Math.PI / 2) * radius;

    let path = `M50,${startY}`;

    if (angle > Math.PI) {
      path += `A${radius} ${radius} 0 0 1 50 ${50 + radius}`;
    }

    path += `A${radius} ${radius} 0 0 1 ${x} ${y}`;

    return path;
  }
</script>

<div class="relative size-full">
  <svg viewBox="0 0 100 100" class="absolute size-full fill-none!">
    <path
      d={generateProgressPath({ value: max, max, strokeWidth })}
      class="stroke-neutral-200"
      stroke-width={strokeWidth}
      stroke-linecap="round"
    />
    <path
      d={generateProgressPath({ value: valueTween.current, max, strokeWidth })}
      class="stroke-neutral-900"
      stroke-width={strokeWidth}
      stroke-linecap="round"
    />
  </svg>

  {#if children}
    <div class="absolute inset-0 flex items-center justify-center">
      {@render children()}
    </div>
  {/if}
</div>
