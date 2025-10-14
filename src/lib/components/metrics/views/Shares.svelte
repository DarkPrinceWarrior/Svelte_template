<!--@component
  Представление метрики долей.
-->

<script module lang="ts">
  /**
   * Цветовая схема для отображения доли.
   *
   * Определяет цвета фона и границы для визуального представления
   * отдельной доли в компоненте `Shares`.
   */
  export interface ShareColors {
    /**
     * Цвет фона доли.
     *
     * Tailwind CSS класс для настройки цвета фона
     * горизонтальной полосы, представляющей долю.
     */
    bg: string;

    /**
     * Цвет границы доли.
     *
     * Tailwind CSS класс для настройки цвета левой границы
     * элемента доли для визуального разделения.
     */
    border: string;
  }

  /**
   * Отдельная доля в компоненте `Shares`.
   *
   * Представляет один элемент в коллекции долей,
   * содержащий числовое значение с подписью и возможностью
   * указания единиц измерения.
   */
  export interface Share {
    /**
     * Подпись к доле.
     *
     * Текстовая строка, описывающая содержание доли
     * и отображаемая под числовым значением.
     */
    label: string;

    /**
     * Числовое значение доли.
     *
     * Основное значение, отображаемое в верхней части
     * элемента доли с анимацией прокрутки при изменении.
     */
    value: number;

    /**
     * Суффикс для значения доли.
     *
     * Опциональная текстовая строка, добавляемая после
     * числового значения для указания единиц измерения.
     */
    suffix?: string;
  }

  /**
   * Свойства компонента `Shares`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * коллекции долей в виде горизонтальных полос с анимированными значениями.
   * Компонент автоматически анимирует появление долей с задержкой
   * и применяет анимацию прокрутки для числовых значений.
   *
   * @example
   * ```typescript
   * <Shares
   *   shares={[
   *     { label: "Продажи", value: 45, suffix: "%" },
   *     { label: "Маркетинг", value: 30, suffix: "%" },
   *     { label: "Администрация", value: 25, suffix: "%" }
   *   ]}
   * />
   * ```
   */
  export interface SharesProps {
    /**
     * Массив долей для отображения.
     *
     * Коллекция объектов `Share`, каждый из которых
     * представляет отдельную долю с числовым значением,
     * подписью и настройками отображения.
     */
    shares: Share[];
  }

  /**
   * Разметка для представления `Shares` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `Shares`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface SharesLayout extends SharesProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `Shares` для отображения данной метрики.
     */
    view: "shares";
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import NumberFlow from "@number-flow/svelte";

  const { shares }: SharesProps = $props();

  const shareAppearDelay = 150;

  const shareColors: ShareColors[] = [
    { bg: "bg-primary-500", border: "border-primary-500" },
    { bg: "bg-primary-500/56", border: "border-primary-500/56" },
    { bg: "bg-primary-500/22", border: "border-primary-500/22" }
  ];

  // Делаем копии для значений и заполняем их через эффект,
  // чтобы инициализировать эффект прокрутки цифр
  let displayedValues = $state(shares.map((_) => 0));

  onMount(() => {
    displayedValues = shares.map((x) => x.value);
  });
</script>

<div class="w-full h-16 flex">
  {#each shares as { label, suffix }, i (i)}
    {@const colors = shareColors[Math.min(i, shareColors.length)]}

    <div
      style="animation-delay: {i * shareAppearDelay}ms;"
      class="border-l-2 {colors.border} size-full flex flex-col justify-between origin-bottom animate-stretch-y"
      class:mx-1={i != 0 && i != shares.length - 1}
    >
      <p class="ml-2 typo-xs! text-neutral-800/22 leading-none!">
        <NumberFlow
          transformTiming={{
            duration: 750,
            delay: i * shareAppearDelay,
            fill: "backwards",
            easing: "ease-out"
          }}
          value={displayedValues[i]}
          {suffix}
        /><br />
        {label}
      </p>

      <div class="rounded-r-xs w-full h-2 {colors.bg}"></div>
    </div>
  {/each}
</div>
