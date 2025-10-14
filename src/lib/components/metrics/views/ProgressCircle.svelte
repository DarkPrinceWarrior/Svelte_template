<!--@component
  Представление метрики в виде круга прогресса.
-->

<script module lang="ts">
  import type { BigNumberProps } from "./BigNumber.svelte";

  /**
   * Свойства компонента `ProgressCircle`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * метрики в виде круга прогресса с числовым значением. Компонент
   * объединяет визуальный индикатор прогресса с детализированным
   * отображением значения через компонент `BigNumber`.
   *
   * @example
   * ```typescript
   * <ProgressCircle
   *   value={75}
   *   max={100}
   *   suffix="%"
   *   trend={5}
   *   trendSuffix="%"
   *   desiredTrend="rise"
   *   label="Выполнение плана"
   * />
   * ```
   */
  export interface ProgressCircleProps extends BigNumberProps {
    /**
     * Максимальное значение для расчета прогресса.
     *
     * Определяет верхнюю границу для расчета процента заполнения
     * круга прогресса. Используется для вычисления соотношения
     * `value / max` для визуального отображения прогресса.
     */
    max: number;
  }

  /**
   * Разметка для представления `ProgressCircle` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `ProgressCircle`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface ProgressCircleLayout extends ProgressCircleProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `ProgressCircle` для отображения данной метрики.
     */
    view: "progress-circle";
  }
</script>

<script lang="ts">
  import { ProgressCircle } from "$lib/components";

  import BigNumber from "./BigNumber.svelte";

  const { value, max, ...bigNumberProps }: ProgressCircleProps = $props();
</script>

<div class="flex items-center gap-4">
  <div class="size-8">
    <ProgressCircle {value} {max} />
  </div>

  <BigNumber {value} {...bigNumberProps} />
</div>
