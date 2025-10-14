<!--@component
  Представление метрики в виде среднего числа.
-->

<script module lang="ts">
  /**
   * Свойства компонента `MediumNumber`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * среднего числа с анимированным значением и дополнительной информацией.
   * Компонент автоматически анимирует изменения значений и отображает
   * их в компактном формате с базовым размером шрифта.
   *
   * @example
   * ```typescript
   * <MediumNumber
   *   value={1250}
   *   suffix="руб."
   *   label="Средний доход"
   * />
   * ```
   */
  export interface MediumNumberProps {
    /**
     * Основное значение метрики.
     *
     * Числовое значение, которое отображается как среднее число
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
   * Разметка для представления `MediumNumber` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `MediumNumber`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface MediumNumberLayout extends MediumNumberProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `MediumNumber` для отображения данной метрики.
     */
    view: "medium-number";
  }
</script>

<script lang="ts">
  import NumberFlow from "@number-flow/svelte";

  const { value, suffix, label }: MediumNumberProps = $props();

  // Делаем копии для значений и заполняем их через эффект,
  // чтобы инициализировать эффект прокрутки цифр
  let displayedValue = $state(0);

  /** Обновляет отображающеесе значение при изменении оригинального значения */
  $effect(() => {
    displayedValue = value;
  });
</script>

<p>
  <span class="typo-base inline-block animate-slide-right">
    <NumberFlow value={displayedValue} {suffix} />
  </span>

  <br />

  {#if label}
    <span
      class="typo-sm inline-block text-neutral-800/22 animate-slide-right animate-delay-350"
    >
      {label}
    </span>
  {/if}
</p>
