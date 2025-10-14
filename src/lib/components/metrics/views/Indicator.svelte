<!--@component
  Отображение для метрики уровня критичности.
-->

<script module lang="ts">
  /**
   * Названия доступных тем для индикатора критичности.
   *
   * Определяет цветовые варианты для отображения уровня критичности
   * метрики с соответствующими визуальными эффектами.
   */
  export type IndicatorThemeName = "green" | "yellow" | "red";

  /**
   * Тема для отображения индикатора критичности.
   *
   * Определяет стили для визуального представления индикатора,
   * включая цвет фона и дополнительные анимационные эффекты.
   */
  export interface IndicatorTheme {
    /**
     * Стиль индикатора критичности.
     *
     * Tailwind CSS классы для настройки внешнего вида
     * круглого индикатора, включая цвет фона и анимации.
     */
    indicator: string;
  }

  /**
   * Свойства компонента `Indicator`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * индикатора уровня критичности с соответствующей цветовой схемой
   * и текстовой подписью.
   *
   * @example
   * ```typescript
   * <Indicator
   *   theme="red"
   *   label="Критический уровень"
   * />
   * ```
   */
  export interface IndicatorProps {
    /**
     * Тема индикатора критичности.
     *
     * Определяет цветовую схему и визуальные эффекты индикатора:
     * - "green" - нормальный уровень (зеленый)
     * - "yellow" - предупреждающий уровень (желтый)
     * - "red" - критический уровень (красный с анимацией пульсации)
     */
    theme: IndicatorThemeName;

    /**
     * Подпись к индикатору.
     *
     * Текстовая строка, отображаемая рядом с индикатором
     * для описания уровня критичности или статуса.
     */
    label: string;
  }

  /**
   * Разметка для представления `Indicator` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `Indicator`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface IndicatorLayout extends IndicatorProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `Indicator` для отображения данной метрики.
     */
    view: "indicator";
  }
</script>

<script lang="ts">
  const { theme, label }: IndicatorProps = $props();

  const themes: Record<IndicatorThemeName, IndicatorTheme> = {
    green: {
      indicator: "bg-green-500"
    },
    yellow: {
      indicator: "bg-yellow-500"
    },
    red: {
      indicator:
        "relative bg-red-500 before:rounded-full before:absolute before:inset-0 before:bg-red-500 before:animate-ping"
    }
  };

  const currentTheme = themes[theme];
</script>

<div class="flex items-center gap-2">
  <div class="rounded-full size-2 {currentTheme.indicator} animate-pop"></div>

  <p class="typo-h4! animate-slide-right">
    {label}
  </p>
</div>
