<!--@component
  Представление метрики в виде временного периода.
-->

<script module lang="ts">
  /**
   * Свойства компонента `TimePeriod`.
   *
   * Определяет все параметры, необходимые для корректного отображения
   * временного периода с начальной и конечной датами. Компонент
   * отображает период в виде двух дат, соединенных пунктирной линией,
   * с возможностью настройки локализации для форматирования дат.
   *
   * @example
   * ```typescript
   * <TimePeriod
   *   start={new Date('2024-01-01')}
   *   end={new Date('2024-12-31')}
   *   locales="ru"
   * />
   * ```
   */
  export interface TimePeriodProps {
    /**
     * Начальная дата периода.
     *
     * Объект Date, представляющий начало временного периода.
     * Отображается в левой части компонента в виде даты
     * в округлом теге с настраиваемой локализацией.
     */
    start: Date;

    /**
     * Конечная дата периода.
     *
     * Объект Date, представляющий конец временного периода.
     * Отображается в правой части компонента в виде даты
     * в округлом теге с настраиваемой локализацией.
     */
    end: Date;

    /**
     * Локализация для форматирования дат.
     *
     * Опциональный параметр для настройки языка и региона
     * отображения дат. По умолчанию используется "ru".
     * Поддерживает стандартные значения Intl.LocalesArgument.
     */
    locales?: Intl.LocalesArgument;
  }

  /**
   * Разметка для представления `TimePeriod` в системе метрик.
   *
   * Определяет структуру данных для использования компонента `TimePeriod`
   * в составе более сложных компоновок метрик. Используется в
   * `MetricCard` для унифицированного отображения различных типов метрик.
   */
  export interface TimePeriodLayout extends TimePeriodProps {
    /**
     * Тип представления метрики.
     *
     * Идентификатор, указывающий на использование компонента
     * `TimePeriod` для отображения данной метрики.
     */
    type: "time-period";
  }
</script>

<script lang="ts">
  const { start, end, locales = "ru" }: TimePeriodProps = $props();
</script>

{#snippet dateTag(date: Date)}
  <p
    class="rounded-full p-2 bg-neutral-500/5 text-neutral-800/50! leading-none!"
  >
    {date.toLocaleDateString(locales)}
  </p>
{/snippet}

<div class="w-full flex items-center gap-2 animate-slide-up">
  {@render dateTag(start)}

  <hr class="border border-dashed border-neutral-300 w-full" />

  {@render dateTag(end)}
</div>
