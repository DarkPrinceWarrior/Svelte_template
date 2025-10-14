<!--@component
  Карточка для отображения метрик.
-->

<script module lang="ts">
  import type {
    BigNumberLayout,
    BubblesLayout,
    IndicatorLayout,
    HRLayout,
    MediumNumberLayout,
    ProgressCircleLayout,
    SharesLayout,
    SmallNumberLayout,
    TimePeriodLayout
  } from "./views";

  /**
   * Варианты стиля заголовка карточки метрики.
   *
   * Определяет различные способы отображения заголовка карточки:
   * - "inline" - заголовок встроен в основную область карточки;
   * - "topbar" - заголовок вынесен в отдельную верхнюю панель.
   */
  export type MetricCardHeaderStyle = "inline" | "topbar";

  /**
   * Типы доступных представлений метрик.
   *
   * Определяет все поддерживаемые типы компонентов для отображения
   * метрик в карточке. Каждый тип соответствует определенному
   * компоненту из модуля views.
   */
  export type MetricViewType =
    | "big-number"
    | "bubbles"
    | "indicator"
    | "hr"
    | "medium-number"
    | "progress-circle"
    | "shares"
    | "small-number"
    | "time-period";

  /**
   * Объединение всех возможных разметок для представления метрик.
   *
   * Определяет все доступные типы разметок, которые могут быть
   * использованы в карточке метрики. Каждый тип разметки
   * соответствует определенному компоненту представления.
   */
  export type MetricViewLayout =
    | BigNumberLayout
    | BubblesLayout
    | IndicatorLayout
    | HRLayout
    | MediumNumberLayout
    | ProgressCircleLayout
    | SharesLayout
    | SmallNumberLayout
    | TimePeriodLayout;

  /**
   * Варианты отображения строки в разметке карточки.
   *
   * Определяет способы расположения элементов в строке:
   * - "between" - элементы распределены по краям с промежутком между ними
   * - "grid" - элементы расположены в сетке с равномерным распределением
   */
  export type LayoutRowDisplay = "between" | "grid";

  /**
   * Строка разметки в карточке метрики.
   *
   * Представляет горизонтальную строку, содержащую набор
   * компонентов метрик с возможностью настройки способа
   * их расположения.
   */
  export interface LayoutRow {
    /**
     * Вариант отображения элементов в строке.
     *
     * Определяет способ расположения компонентов метрик
     * в горизонтальной строке. Если не указан, используется "between".
     */
    display?: LayoutRowDisplay;

    /**
     * Список компонентов метрик в строке.
     *
     * Массив разметок для различных типов метрик,
     * которые будут отображены в данной строке.
     */
    items: MetricViewLayout[];
  }

  /**
   * Свойства компонента `MetricCard`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * карточки метрики с настраиваемым заголовком, цветовой схемой
   * и компоновкой различных типов метрик.
   *
   * @example
   * ```typescript
   * <MetricCard
   *   label="Финансовые показатели"
   *   colorScheme="green"
   *   headerStyle="inline"
   *   icon={ChartIcon}
   *   layout={[
   *     {
   *       display: "between",
   *       items: [
   *         { view: "big-number", value: 1250, suffix: "руб." },
   *         { view: "indicator", theme: "green", label: "Статус" }
   *       ]
   *     }
   *   ]}
   * />
   * ```
   */
  export interface MetricCardProps {
    /**
     * Цветовая схема карточки.
     *
     * Определяет визуальное оформление карточки, включая
     * цвета иконок, фонов и текста. Если не указана,
     * используется схема "neutral".
     */
    colorScheme?: MetricCardColorSchemeName;

    /**
     * Иконка для отображения в заголовке.
     *
     * Svelte компонент иконки, который будет отображен
     * в заголовке карточки рядом с подписью.
     */
    icon?: any;

    /**
     * Разметка метрик для отображения.
     *
     * Массив строк разметки, каждая из которых содержит
     * набор компонентов метрик для отображения в карточке.
     * Если не указана, используется пустая разметка.
     */
    layout?: LayoutRow[];

    /**
     * Пользовательское содержимое карточки.
     *
     * Svelte snippet для отображения пользовательского
     * содержимого вместо стандартной разметки метрик.
     * По умолчанию используется стандартная разметка.
     */
    children?: Snippet;

    /**
     * Подпись карточки.
     *
     * Текстовая строка, отображаемая в заголовке карточки
     * для описания содержащихся в ней метрик.
     */
    label: string;

    /**
     * Стиль отображения заголовка.
     *
     * Определяет способ отображения заголовка карточки.
     * Если не указан, используется стиль "inline".
     */
    headerStyle?: MetricCardHeaderStyle;

    /**
     * Содержимое правой части заголовка.
     *
     * Опциональный Svelte snippet для отображения
     * дополнительного содержимого в правой части заголовка,
     * например, кнопок действий или дополнительной информации.
     */
    headerRightSidebar?: Snippet;
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  import {
    colorSchemes,
    type MetricCardColorSchemeName
  } from "./colorSchemes.js";

  import {
    BigNumber,
    Bubbles,
    Indicator,
    HR,
    MediumNumber,
    ProgressCircle,
    Shares,
    SmallNumber,
    TimePeriod
  } from "./views";

  let {
    colorScheme: colorSchemeName = "neutral",
    headerStyle = "inline",
    icon: Icon,
    label,
    layout,
    children = metricLayout,
    headerRightSidebar
  }: MetricCardProps = $props();

  const id = $props.id();

  const currentColorScheme = colorSchemes[colorSchemeName];

  const metricViews: Record<MetricViewType, any> = {
    "big-number": BigNumber,
    bubbles: Bubbles,
    indicator: Indicator,
    hr: HR,
    "medium-number": MediumNumber,
    "progress-circle": ProgressCircle,
    shares: Shares,
    "small-number": SmallNumber,
    "time-period": TimePeriod
  };
</script>

{#snippet metricLayout()}
  {#each layout as row, i (i)}
    {@const { display, items } = row}

    <div
      class={[
        (!display || display === "between") && "flex justify-between ",
        display === "grid" &&
          "grid [grid-template-columns:repeat(var(--count),minmax(0,1fr))]",
        "items-end"
      ]}
      style="--count:{items.length};"
    >
      {#each items as { view, ...props }, i (i)}
        {@const View = metricViews[view]}
        <View {...props} />
      {/each}
    </div>
  {/each}
{/snippet}

{#if headerStyle === "inline"}
  <section
    {id}
    class="rounded-4xl p-4 w-full flex flex-col gap-4 {currentColorScheme
      .contentBg.inline}"
  >
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center gap-4">
        {#if Icon}
          <div
            class="rounded-full size-11 flex justify-center items-center {currentColorScheme.iconBg}"
          >
            <div class="size-6 {currentColorScheme.icon.inline}">
              <Icon />
            </div>
          </div>
        {/if}

        <label
          for={id}
          class="typo-base! {currentColorScheme.text} font-semibold"
        >
          {label}
        </label>
      </div>

      {@render headerRightSidebar?.()}
    </div>

    <div class="ml-2 size-full flex flex-col gap-6">
      {@render children()}
    </div>
  </section>
{:else if headerStyle === "topbar"}
  <section
    {id}
    class="border border-neutral-800/4 rounded-2xl p-1 pt-2 w-full flex flex-col gap-4 bg-neutral-800/2"
  >
    <div class="px-2 flex items-center gap-2">
      {#if Icon}
        <div class="size-6 {currentColorScheme.icon.topbar}">
          <Icon />
        </div>
      {/if}

      <label for={id} class="typo-base! text-neutral-800/22! font-semibold">
        {label}
      </label>
    </div>

    <div
      class="rounded-xl p-4 size-full flex flex-col gap-6 {currentColorScheme
        .contentBg.topbar}"
    >
      {@render children()}
    </div>
  </section>
{/if}

<style>
  @reference '$lib/styles/global.css';

  /**
   * Чтобы пользователю не приходилось стилизировать горизонтальные
   * линии в рамках карточек метрик и чтобы не дублировать стили
   * для hr d `HR.svelte` пропишем их глобально тут.
   */
  :global(hr) {
    @apply border border-neutral-800/5 w-full;
  }
</style>
