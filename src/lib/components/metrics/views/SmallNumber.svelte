<!--@component
  Представление метрики с маленьким числом.
-->

<script module lang="ts">
  /**
   * Свойства компонента `SmallNumber`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * маленького числа с анимированным значением и дополнительной информацией.
   * Компонент автоматически анимирует изменения значений и отображает
   * их в компактном формате с малым размером шрифта.
   *
   * @example
   * ```typescript
   * <SmallNumber
   *   value={42}
   *   suffix="шт."
   *   label="Количество товаров"
   * />
   * ```
   */
  export interface SmallNumberProps {
    /**
     * Основное значение метрики.
     *
     * Числовое значение, которое отображается как маленькое число
     * с анимацией прокрутки при изменении.
     */
    value: number;

    /**
     * Суффикс для основного значения.
     *
     * Текстовая строка, добавляемая после основного значения
     * для указания единиц измерения (например, "шт.", "чел.", "ед.").
     */
    suffix: string;

    /**
     * Подпись к метрике.
     *
     * Текстовая строка, отображаемая под основным значением
     * для дополнительного описания метрики.
     */
    label: string;
  }

  /**
   * Разметка для представления `SmallNumber` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `SmallNumber`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface SmallNumberLayout extends SmallNumberProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `SmallNumber` для отображения данной метрики.
     */
    view: "small-number";
  }
</script>

<script lang="ts">
  import NumberFlow from "@number-flow/svelte";

  const { value, suffix, label }: SmallNumberProps = $props();

  // Делаем копии для значений и заполняем их через эффект,
  // чтобы инициализировать эффект прокрутки цифр
  let displayedValue = $state(0);

  /** Обновляет отображающеесе значение при изменении оригинального значения */
  $effect(() => {
    displayedValue = value;
  });
</script>

<p class="typo-xs!">
  <span class="inline-block animate-slide-right">
    <NumberFlow value={displayedValue} {suffix} />
  </span>

  <br />

  {#if label}
    <span
      class="inline-block text-neutral-800/22 animate-slide-right animate-delay-350"
    >
      {label}
    </span>
  {/if}
</p>
