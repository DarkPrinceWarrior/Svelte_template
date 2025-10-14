/**
 * @fileoverview Цветовые схемы для компонента `MetricCard`
 * @author Буравов Илья (ilburale@gmail.com)
 */

/**
 * Названия доступных цветовых схем для карточек метрик.
 *
 * Определяет предустановленные цветовые темы, которые можно применить
 * к компоненту MetricCard.
 *
 * @example
 * ```typescript
 * <MetricCard colorScheme="green" ... />
 * ```
 */
export type MetricCardColorSchemeName = "neutral" | "neutral-dark" | "red" | "yellow" | "green";

/**
 * Вариации цветов для разных стилей отображения.
 *
 * Содержит различные варианты цветов в зависимости от стиля заголовка.
 */
export interface MetricCardColorSchemeColorVariants {
  /**
   * Цвет для варианта с вписанным заголовком.
   *
   * Используется когда заголовок отображается в одной строке с содержимым.
   * Обычно имеет более насыщенный цвет для лучшей читаемости.
   */
  inline: string;

  /**
   * Цвет для варианта с отделенным заголовком.
   *
   * Используется когда заголовок отображается в отдельной области.
   * Обычно имеет приглушенный цвет для создания визуальной иерархии.
   */
  topbar: string;
}

/**
 * Полная цветовая схема для карточки метрики.
 *
 * Определяет все цветовые аспекты компонента MetricCard, включая
 * цвета иконок, фонов, текста и различных вариантов отображения.
 * Обеспечивает единообразный внешний вид карточек в приложении.
 */
export interface MetricCardColorScheme {
  /**
   * Цветовые варианты для иконки.
   *
   * Определяет цвет иконки в зависимости от стиля отображения заголовка.
   * Использует Tailwind CSS классы для настройки цвета заливки.
   */
  icon: MetricCardColorSchemeColorVariants;

  /**
   * Цвет фона иконки.
   *
   * Определяет цвет фона, на котором отображается иконка.
   * Использует Tailwind CSS классы для настройки фонового цвета.
   */
  iconBg: string;

  /**
   * Цвет текста в карточке.
   *
   * Определяет основной цвет текста, используемого в содержимом карточки.
   * Использует Tailwind CSS классы для настройки цвета текста.
   */
  text: string;

  /**
   * Цветовые варианты для фона содержимого.
   *
   * Определяет цвет фона области с содержимым карточки в зависимости
   * от стиля отображения заголовка.
   */
  contentBg: MetricCardColorSchemeColorVariants;
}

/**
 * Предустановленные цветовые схемы для карточек метрик.
 *
 * Содержит все доступные цветовые темы, которые можно использовать
 * с компонентом MetricCard. Каждая схема определяет полный набор
 * цветов для создания согласованного визуального стиля.
 */
export const colorSchemes: Record<
  MetricCardColorSchemeName,
  MetricCardColorScheme
> = {
  /** Нейтральная цветовая схема - стандартная схема для обычных метрик */
  neutral: {
    icon: {
      inline: "fill-neutral-900!",
      topbar: "fill-neutral-800/22!"
    },
    iconBg: "bg-neutral-800/12",
    text: "text-neutral-900!",
    contentBg: {
      inline: "bg-neutral-800/2",
      topbar: "bg-neutral-100"
    }
  },
  /** Темная нейтральная схема - для метрик с более приглушенным стилем */
  "neutral-dark": {
    icon: {
      inline: "fill-neutral-900!",
      topbar: "fill-neutral-800/22!"
    },
    iconBg: "bg-neutral-800/12",
    text: "text-neutral-900!",
    contentBg: {
      inline: "bg-neutral-800/1",
      topbar: "bg-neutral-50"
    }
  },
  /** Зеленая схема - для положительных метрик, успешных показателей */
  green: {
    icon: {
      inline: "fill-green-500!",
      topbar: "fill-green-500/17!"
    },
    iconBg: "bg-green-500/17",
    text: "text-green-500!",
    contentBg: {
      inline: "bg-neutral-800/2",
      topbar: "bg-neutral-100"
    }
  },
  /** Желтая схема - для предупреждающих метрик, средних показателей */
  yellow: {
    icon: {
      inline: "fill-yellow-500!",
      topbar: "fill-yellow-500/17!"
    },
    iconBg: "bg-yellow-500/17",
    text: "text-yellow-500!",
    contentBg: {
      inline: "bg-neutral-800/2",
      topbar: "bg-neutral-100"
    }
  },
  /** Красная схема - для критических метрик, негативных показателей */
  red: {
    icon: {
      inline: "fill-red-500!",
      topbar: "fill-red-500/17!"
    },
    iconBg: "bg-red-500/17",
    text: "text-red-500!",
    contentBg: {
      inline: "bg-neutral-800/2",
      topbar: "bg-neutral-100"
    }
  },
};
