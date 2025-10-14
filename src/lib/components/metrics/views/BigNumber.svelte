<!--@component
  Представление метрики в виде большого числа с подписью.
-->

<script module lang="ts">
  /**
   * Тип направления тренда для метрики.
   *
   * Определяет желаемое направление изменения значения метрики
   * для корректного отображения цветовой индикации.
   */
  export type Trend = "down" | "rise";

  /**
   * Свойства компонента `BigNumber`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * большого числа с возможностью показа тренда и дополнительной информации.
   * Компонент автоматически анимирует изменения значений и применяет
   * цветовую индикацию в зависимости от направления тренда.
   *
   * @example
   * ```typescript
   * <BigNumber
   *   value={1250}
   *   suffix="руб."
   *   trend={15.5}
   *   trendSuffix="%"
   *   desiredTrend="rise"
   *   label="Доходы за месяц
   * />
   * ```
   */
  export interface BigNumberProps {
    /**
     * Тренд изменения значения.
     *
     * Числовое значение, показывающее изменение метрики.
     * Положительное значение отображается зеленым цветом, если
     * `desiredTrend` равен "rise", и красным - если "down".
     * Отрицательное значение работает наоборот.
     */
    trend?: number;

    /**
     * Суффикс для отображения тренда.
     *
     * Текстовая строка, добавляемая после значения тренда
     * для указания единиц измерения (например, "%", "руб.", "шт.").
     */
    trendSuffix?: string;

    /**
     * Желаемое направление тренда.
     *
     * Определяет, какое направление изменения считается положительным
     * для данной метрики. Используется для корректной цветовой индикации.
     * - "rise" - рост значения считается положительным
     * - "down" - снижение значения считается положительным
     */
    desiredTrend?: Trend;

    /**
     * Основное значение метрики.
     *
     * Числовое значение, которое отображается как большое число
     * с анимацией прокрутки при изменении.
     */
    value: number;

    /**
     * Суффикс для основного значения.
     *
     * Текстовая строка, добавляемая после основного значения
     * для указания единиц измерения (например, "руб.", "шт.", "чел.").
     */
    suffix: string;

    /**
     * Подпись к метрике.
     *
     * Опциональный текст, отображаемый под основным значением
     * для дополнительного описания метрики.
     */
    label?: string;
  }

  /**
   * Разметка для представления `BigNumber` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `BigNumber`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   *
   * @example
   * ```typescript
   * const layout: BigNumberLayout = {
   *   view: "big-number",
   *   value: 1250,
   *   suffix: "руб.",
   *   trend: 15.5,
   *   trendSuffix: "%",
   *   desiredTrend: "rise",
   *   label: "Доходы за месяц"
   * };
   * ```
   */
  export interface BigNumberLayout extends BigNumberProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `BigNumber` для отображения данной метрики.
     */
    view: "big-number";
  }
</script>

<script lang="ts">
  import NumberFlow from "@number-flow/svelte";

  const {
    trend,
    trendSuffix,
    desiredTrend,
    value,
    suffix,
    label
  }: BigNumberProps = $props();

  const id = $props.id();

  let desiredTrendSign = desiredTrend === "rise" ? 1 : -1;

  // Делаем копии для значений и заполняем их через эффект,
  // чтобы инициализировать эффект прокрутки цифр
  let displayedTrend = $state(0);
  let displayedValue = $state(0);

  /** Обновляет отображающийся тренд при изменении оригинального тренда */
  $effect(() => {
    displayedTrend = trend;
  });

  /** Обновляет отображающеесе значение при изменении оригинального значения */
  $effect(() => {
    displayedValue = value;
  });
</script>

<div {id} class="size-max">
  <div class="h-max flex">
    <p class="typo-h3!"><NumberFlow value={displayedValue} /></p>

    <div class="h-full">
      {#if trend}
        <div class="w-full min-w-max flex justify-end">
          <p
            class="typo-xs"
            class:text-green-500={Math.sign(trend) === desiredTrendSign}
            class:text-red-500={Math.sign(trend) !== desiredTrendSign}
          >
            <NumberFlow
              value={displayedTrend}
              prefix={trend > 0 ? "+" : undefined}
            />

            <span class="inline-block animate-slide-right animate-delay-350">
              {trendSuffix}
            </span>
          </p>
        </div>
      {/if}

      <p
        class="inline-block typo-sm! text-neutral-800/22 animate-slide-right animate-delay-400"
      >
        {suffix}
      </p>
    </div>
  </div>

  {#if label}
    <span
      class="inline-block text-neutral-800/22 animate-slide-right animate-delay-450"
    >
      {label}
    </span>
  {/if}
</div>
