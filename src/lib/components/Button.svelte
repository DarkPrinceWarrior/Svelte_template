<!--@component
  Кнопка.
-->

<script module lang="ts">
  import type { Component, Snippet } from "svelte";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes
  } from "svelte/elements";

  /**
   * Цветовая схема кнопки.
   *
   * Определяет визуальный стиль и семантическое значение кнопки:
   * - `"primary"` - основная кнопка (яркий акцентный цвет)
   * - `"secondary"` - вторичная кнопка (приглушенный акцентный цвет)
   * - `"tertiary"` - третичная кнопка (минимальный акцент)
   * - `"neutral"` - нейтральная кнопка (серые тона)
   * - `"negative"` - негативная кнопка (красные тона для опасных действий)
   * - `"transparent"` - прозрачная кнопка (без фона)
   *
   * @example
   * ```typescript
   * // Основное действие
   * <Button colorScheme="primary">...</Button>
   *
   * // Вторичное действие
   * <Button colorScheme="secondary">...</Button>
   *
   * // Опасное действие
   * <Button colorScheme="negative">...</Button>
   * ```
   */
  type ButtonColorScheme =
    | "primary"
    | "secondary"
    | "tertiary"
    | "neutral"
    | "negative"
    | "transparent";

  /**
   * Размер кнопки.
   *
   * Определяет внутренние отступы кнопки.
   * Размеры автоматически адаптируются для кнопок только с иконкой.
   *
   * @example
   * ```typescript
   * // Компактная кнопка
   * <Button size="small>...</Button>
   *
   * // Стандартная кнопка
   * <Button size="medium">...</Button>
   *
   * // Большая кнопка
   * <Button size="large">...</Button>
   * ```
   */
  type ButtonSize = "small" | "medium" | "large";

  /**
   * Ширина кнопки.
   *
   * Контролирует горизонтальное пространство, занимаемое кнопкой:
   * - `"max"` - кнопка занимает только необходимое пространство
   * - `"full"` - кнопка растягивается на всю доступную ширину
   *
   * @example
   * ```typescript
   * // Кнопка по содержимому
   * <Button width="max">...</Button>
   *
   * // Кнопка на всю ширину
   * <Button width="full">...</Button>
   * ```
   */
  type ButtonWidth = "max" | "full";

  /**
   * Позиция иконки относительно текста.
   *
   * Определяет расположение иконки в кнопке:
   * - `"left"` - иконка слева от текста (по умолчанию)
   * - `"right"` - иконка справа от текста
   *
   * @example
   * ```typescript
   * // Иконка слева
   * <Button iconPosition="left">...</Button>
   *
   * // Иконка справа
   * <Button iconPosition="right">...</Button>
   * ```
   */
  type IconPositioning = "left" | "right";

  /**
   * Степень скругления углов кнопки.
   *
   * Определяет радиус скругления углов кнопки:
   * - `"lg"` - умеренное скругление
   * - `"2xl"` - сильное скругление (по умолчанию)
   * - `"full"` - полностью круглые углы (pill-форма)
   *
   * @example
   * ```typescript
   * // Умеренное скругление
   * <Button rounding="lg">...</Button>
   *
   * // Сильное скругление
   * <Button rounding="2xl">...</Button>
   *
   * // Pill-форма
   * <Button rounding="full">...</Button>
   * ```
   */
  type ButtonRounding = "lg" | "2xl" | "full";

  interface BaseProps extends Omit<HotKeyParams, "action"> {
    /**
     * Содержимое кнопки.
     *
     * Snippet для рендеринга текстового содержимого кнопки.
     * Если не указан, кнопка будет отображаться только с иконкой.
     *
     * @example
     * ```typescript
     * // Текстовое содержимое
     * children: () => "Нажми меня"
     *
     * // HTML содержимое
     * children: () => html`<strong>Важно</strong>`
     * ```
     */
    children?: Snippet;

    /**
     * Размер кнопки.
     *
     * Определяет внутренние отступы и общий размер кнопки.
     * Автоматически адаптируется для кнопок только с иконкой.
     *
     * @default "small"
     * @see ButtonSize
     */
    size?: ButtonSize;

    /**
     * Ширина кнопки.
     *
     * Контролирует горизонтальное пространство, занимаемое кнопкой.
     *
     * @default "max"
     * @see ButtonWidth
     */
    width?: ButtonWidth;

    /**
     * Цветовая схема кнопки.
     *
     * Определяет визуальный стиль и семантическое значение кнопки.
     *
     * @default "primary"
     * @see ButtonColorScheme
     */
    colorScheme?: ButtonColorScheme;

    /**
     * Степень скругления углов кнопки.
     *
     * @default "2xl"
     * @see ButtonRounding
     */
    rounding?: ButtonRounding;

    /**
     * Иконка кнопки.
     *
     * Svelte компонент иконки для отображения в кнопке.
     * Поддерживает анимацию появления/исчезновения.
     *
     * @example
     * ```typescript
     * // Импорт иконки
     * import SaveIcon from "$lib/icons/SaveIcon.svelte";
     *
     * // Использование
     * icon: SaveIcon
     * ```
     */
    icon?: Component;

    /**
     * Позиция иконки относительно текста.
     *
     * @default "left"
     * @see IconPositioning
     */
    iconPosition?: IconPositioning;
  }

  /**
   * Конфигурация компонента кнопки.
   *
   * Используется когда компонент рендерится как HTML button элемент.
   * Наследует все стандартные HTML атрибуты кнопки.
   */
  interface ButtonProps extends BaseProps, HTMLButtonAttributes {}

  /**
   * Конфигурация компонента кнопки в качестве ссылки.
   *
   * Используется когда компонент рендерится как HTML anchor элемент.
   * Автоматически активируется при наличии атрибута `href`.
   * Наследует все стандартные HTML атрибуты ссылки.
   */
  interface AnchorProps extends BaseProps, HTMLAnchorAttributes {}
</script>

<script lang="ts">
  import { slide } from "svelte/transition";

  import { hotkey, type HotKeyParams } from "$lib/attachments";

  import HotKeyTag from "./HotKeyTag.svelte";

  const {
    /** Общие настройки кнопки */

    children,
    size = "small",
    width = "max",
    colorScheme = "primary",
    rounding = "2xl",
    icon: Icon,
    iconPosition = "left",

    /** Настройки горячей клавишы */

    key,
    ctrl,
    alt,
    shift,
    meta,

    /** Оверрайды HTML атрибутов */

    type = "button",

    /** HTML атрибуты */

    ...htmlAttributes
  }: ButtonProps | AnchorProps = $props();

  const iconOnly = Icon && !children;

  const sizes = {
    small: iconOnly ? "p-2" : "px-4 py-2",
    medium: iconOnly ? "p-3" : "px-6 py-3",
    large: iconOnly ? "p-4 w-full" : "px-8 py-4"
  };

  const widths = {
    max: "w-max",
    full: "w-full"
  };

  const roundings = {
    lg: "rounded-lg",
    "2xl": "rounded-2xl",
    full: "rounded-full"
  };
</script>

{#snippet content()}
  <div class="btn-content relative z-10 w-max flex gap-2 items-center">
    <div
      class="flex items-center"
      class:flex-row-reverse={iconPosition === "right"}
    >
      {#if Icon}
        <div
          class="icon-wrapper mx-2 size-6 flex"
          transition:slide={{ axis: "x", duration: 150 }}
        >
          <Icon />
        </div>
      {/if}

      {#if children}
        <p>{@render children()}</p>
      {/if}
    </div>

    {#if key}
      <HotKeyTag {colorScheme} {key} {shift} {ctrl} {alt} {meta} />
    {/if}
  </div>
{/snippet}

{#if "href" in htmlAttributes}
  <a
    class="group"
    {...htmlAttributes as HTMLAnchorAttributes}
    {@attach hotkey({ key, ctrl, alt, shift, meta })}
  >
    <div
      class="btn-{colorScheme} {roundings[rounding]} {widths[width]} {sizes[
        size
      ]}"
    >
      {@render content()}
    </div>
  </a>
{:else}
  <button
    class="group btn-{colorScheme} {roundings[rounding]} {widths[width]} {sizes[
      size
    ]}"
    tabindex="0"
    {type}
    {...htmlAttributes as HTMLButtonAttributes}
    {@attach hotkey({ key, ctrl, alt, shift, meta })}
  >
    {@render content()}
  </button>
{/if}

<style>
  @reference '$lib/styles/global.css';

  .btn-primary,
  .btn-secondary,
  .btn-tertiary,
  .btn-neutral,
  .btn-negative,
  .btn-transparent {
    @apply h-max relative outline-4 outline-transparent cursor-pointer disabled:cursor-not-allowed select-none transition-colors duration-150 no-underline;

    .btn-content {
      @apply size-full flex justify-center items-center font-medium leading-none transition-colors duration-150;
    }
  }

  .btn-primary {
    @apply bg-button-primary-bg enabled:hover:bg-button-primary-bg-hover enabled:focus:bg-button-primary-bg enabled:active:bg-button-primary-bg-pressed disabled:bg-button-primary-bg-disabled enabled:focus:outline-button-primary-bg-disabled;

    .btn-content {
      @apply text-button-primary-content group-disabled:text-button-primary-content-disabled;
    }

    :global(svg) {
      @apply fill-button-primary-content! group-disabled:fill-button-primary-content-disabled! stroke-button-primary-content! group-disabled:stroke-button-primary-content-disabled!;
    }
  }

  .btn-secondary {
    @apply bg-button-secondary-bg enabled:focus:bg-button-secondary-bg enabled:hover:bg-button-secondary-bg-hover enabled:active:bg-button-secondary-bg-pressed disabled:bg-button-secondary-bg-disabled enabled:focus:outline-button-primary-bg-disabled;

    .btn-content {
      @apply text-button-secondary-content group-disabled:text-button-secondary-content-disabled;
    }

    :global(svg) {
      @apply fill-button-secondary-content! group-disabled:fill-button-secondary-content-disabled! stroke-button-secondary-content! group-disabled:stroke-button-secondary-content-disabled!;
    }
  }

  .btn-tertiary {
    @apply bg-button-tertiary-bg enabled:focus:bg-button-tertiary-bg-hover enabled:hover:bg-button-tertiary-bg-hover enabled:active:bg-button-tertiary-bg-pressed disabled:bg-button-tertiary-bg-disabled enabled:focus:outline-button-tertiary-bg-hover;

    .btn-content {
      @apply text-button-tertiary-content group-disabled:text-button-tertiary-content-disabled;
    }

    :global(svg) {
      @apply fill-button-tertiary-content! group-disabled:fill-button-tertiary-content-disabled! stroke-button-tertiary-content! group-disabled:stroke-button-tertiary-content-disabled!;
    }
  }

  .btn-neutral {
    @apply bg-button-tertiary-bg enabled:focus:bg-button-tertiary-bg-hover enabled:hover:bg-button-tertiary-bg-pressed enabled:active:bg-button-tertiary-bg-pressed disabled:bg-button-tertiary-bg-disabled focus:outline-neutral-200/80;

    .btn-content {
      @apply text-neutral-800 group-disabled:text-button-tertiary-content-disabled;
    }

    :global(svg) {
      @apply fill-neutral-800! group-disabled:fill-button-tertiary-content-disabled! stroke-neutral-800! group-disabled:stroke-button-tertiary-content-disabled!;
    }
  }

  .btn-negative {
    @apply bg-tag-negative-bg enabled:focus:bg-tag-negative-bg enabled:hover:bg-tag-negative-bg enabled:active:bg-tag-negative-bg disabled:bg-button-tertiary-bg-disabled enabled:focus:outline-tag-negative-bg;

    .btn-content {
      @apply text-tag-negative-content group-disabled:text-button-tertiary-content-disabled;
    }

    :global(svg) {
      @apply fill-tag-negative-content! group-disabled:fill-button-tertiary-content-disabled! stroke-tag-negative-content! group-disabled:stroke-button-tertiary-content-disabled!;
    }
  }

  .btn-transparent {
    @apply bg-transparent enabled:hover:bg-neutral-300 focus:outline-neutral-900/50;

    .btn-content {
      @apply text-neutral-900;
    }

    :global(svg) {
      @apply fill-neutral-900! stroke-neutral-900!;
    }
  }
</style>
