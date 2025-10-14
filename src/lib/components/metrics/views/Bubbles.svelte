<!--@component
  Представление метрики в виде пузырьков.
-->

<script module lang="ts">
  /**
   * Названия доступных цветовых схем для пузырьков.
   *
   * Определяет предустановленные цветовые темы для отображения
   * отдельных пузырьков в зависимости от их значения или статуса.
   */
  type BubbleColorSchemeName = "neutral" | "green" | "yellow" | "red";

  /**
   * Цветовая схема для отображения пузырька.
   *
   * Определяет цвета фона и текста для визуального представления
   * отдельного пузырька в компоненте `Bubbles`.
   */
  export interface BubbleColorScheme {
    /**
     * Стиль заднего фона пузырька.
     *
     * Tailwind CSS класс для настройки цвета и прозрачности
     * фона круглого элемента пузырька.
     */
    bg: string;

    /**
     * Стиль текста пузырька.
     *
     * Tailwind CSS класс для настройки цвета текста,
     * отображаемого внутри пузырька.
     */
    text: string;
  }

  /**
   * Отдельный пузырек в компоненте `Bubbles`.
   *
   * Представляет один элемент в коллекции пузырьков,
   * содержащий числовое значение с возможностью настройки
   * цветовой схемы и единиц измерения.
   *
   * @example
   * ```typescript
   * const bubble: Bubble = {
   *   value: 42,
   *   suffix: "шт.",
   *   colorScheme: "green"
   * };
   * ```
   */
  export interface Bubble {
    /**
     * Цветовая схема пузырька.
     *
     * Определяет визуальное оформление пузырька.
     * Если не указана, используется схема "neutral".
     */
    colorScheme?: BubbleColorSchemeName;

    /**
     * Числовое значение пузырька.
     *
     * Основное значение, отображаемое внутри пузырька
     * с анимацией прокрутки при изменении.
     */
    value: number;

    /**
     * Суффикс для значения пузырька.
     *
     * Опциональная текстовая строка, добавляемая после
     * числового значения для указания единиц измерения.
     */
    suffix?: string;
  }

  /**
   * Свойства компонента `Bubbles`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * коллекции пузырьков с анимированными значениями и цветовой индикацией.
   * Компонент автоматически анимирует появление пузырьков с задержкой
   * и применяет анимацию прокрутки для числовых значений.
   *
   * @example
   * ```typescript
   * <Bubbles
   *   label="Показатели по категориям"
   *   bubbles={[
   *     { value: 15, suffix: "шт.", colorScheme: "green" },
   *     { value: 8, suffix: "шт.", colorScheme: "yellow" },
   *     { value: 3, suffix: "шт.", colorScheme: "red" }
   *   ]}
   * />
   * ```
   */
  export interface BubblesProps {
    /**
     * Подпись к коллекции пузырьков.
     *
     * Текстовая строка, отображаемая под пузырьками
     * для описания представленных данных.
     */
    label: string;

    /**
     * Массив пузырьков для отображения.
     *
     * Коллекция объектов `Bubble`, каждый из которых
     * представляет отдельный элемент с числовым значением
     * и настройками отображения.
     */
    bubbles: Bubble[];
  }

  /**
   * Разметка для представления `Bubbles` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `Bubbles`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   *
   * @example
   * ```typescript
   * const layout: BubblesLayout = {
   *   view: "bubbles",
   *   label: "Показатели по категориям",
   *   bubbles: [
   *     { value: 15, suffix: "шт.", colorScheme: "green" },
   *     { value: 8, suffix: "шт.", colorScheme: "yellow" },
   *     { value: 3, suffix: "шт.", colorScheme: "red" }
   *   ]
   * };
   * ```
   */
  export interface BubblesLayout extends BubblesProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `Bubbles` для отображения данной метрики.
     */
    view: "bubbles";
  }
</script>

<script lang="ts">
  import NumberFlow from "@number-flow/svelte";

  import { onMount } from "svelte";

  const { label, bubbles }: BubblesProps = $props();

  const id = $props.id();
  const bubbleAppearDelay = 100;
  const defaultColorSchemeName: BubbleColorSchemeName = "neutral";
  const colorSchemes: Record<BubbleColorSchemeName, BubbleColorScheme> = {
    neutral: {
      bg: "bg-neutral-200/22",
      text: "text-neutral-900"
    },
    green: {
      bg: "bg-green-500/17",
      text: "text-green-500"
    },
    yellow: {
      bg: "bg-yellow-500/17",
      text: "text-yellow-500"
    },
    red: {
      bg: "bg-red-200/17",
      text: "text-red-500"
    }
  };

  // Делаем копии для значений и заполняем их через эффект,
  // чтобы инициализировать эффект прокрутки цифр
  let displayedValues = $state(bubbles.map((_) => 0));

  onMount(() => {
    displayedValues = bubbles.map((x) => x.value);
  });
</script>

<section {id}>
  <ul class="flex gap-2">
    {#each bubbles as { colorScheme: colorSchemeName, suffix }, i (i)}
      {@const { bg: bgColor, text: textColor } =
        colorSchemes[colorSchemeName || defaultColorSchemeName]}

      <li
        style="animation-delay: {i * bubbleAppearDelay}ms;"
        class="min-w-8 w-max relative flex justify-center items-center animate-pop"
      >
        <div class="rounded-full size-8 absolute {bgColor}"></div>

        <p class="flex justify-center items-center {textColor}">
          <NumberFlow
            transformTiming={{
              duration: 500,
              delay: i * bubbleAppearDelay,
              fill: "backwards",
              easing: "ease-out"
            }}
            value={displayedValues[i]}
            {suffix}
          />
        </p>
      </li>
    {/each}
  </ul>

  {#if label}
    <label
      for={id}
      style="animation-delay: {bubbles.length * bubbleAppearDelay}ms;"
      class="inline-block typo-sm! text-neutral-800/22 animate-slide-right"
    >
      {label}
    </label>
  {/if}
</section>
