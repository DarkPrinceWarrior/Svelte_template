<!--@component
  Поле ввода даты с календарем.

  Компонент предоставляет интерактивный интерфейс для выбора даты с выпадающим календарем.
  Поддерживает ограничения по минимальной и максимальной дате, анимации и валидацию.
-->

<script module lang="ts">
  /**
   * Свойства компонента DateInput.
   *
   * Компонент для выбора даты с выпадающим календарем.
   * Поддерживает ограничения по датам, валидацию и анимации.
   *
   * @example
   * ```typescript
   * // Базовое использование
   * <DateInput bind:value={selectedDate} label="Дата рождения" />
   *
   * // С ограничениями
   * <DateInput
   *   bind:value={eventDate}
   *   label="Дата события"
   *   minDate={new Date()}
   *   maxDate={new Date(2025, 11, 31)}
   *   required
   * />
   *
   * // С кастомным placeholder
   * <DateInput
   *   bind:value={appointmentDate}
   *   placeholder="Выберите время встречи"
   * />
   * ```
   */
  export interface DateInputProps {
    /**
     * Выбранная дата.
     *
     * Двусторонне связанное значение для хранения выбранной даты.
     * Если `null`, дата не выбрана.
     *
     * @example
     * ```typescript
     * let selectedDate: Date | null = null;
     *
     * // В компоненте
     * <DateInput bind:value={selectedDate} />
     * ```
     */
    value: Date | null;

    /**
     * Лейбл поля.
     *
     * Текстовая метка, отображаемая над полем ввода.
     * Если не указан, лейбл не отображается.
     *
     * @example
     * ```typescript
     * <DateInput bind:value={date} label="Дата рождения" />
     * ```
     */
    label?: string;

    /**
     * Местозаместитель.
     *
     * Текст, отображаемый когда дата не выбрана.
     * По умолчанию "Выберите дату".
     *
     * @default "Выберите дату"
     * @example
     * ```typescript
     * <DateInput
     *   bind:value={date}
     *   placeholder="Выберите дату начала проекта"
     * />
     * ```
     */
    placeholder?: string;

    /**
     * Обязательное поле.
     *
     * Если `true`, поле становится обязательным для заполнения.
     * При `true` и пустом значении автоматически устанавливается текущая дата.
     *
     * @default false
     * @example
     * ```typescript
     * <DateInput bind:value={requiredDate} required />
     * ```
     */
    required?: boolean;

    /**
     * Минимальная допустимая дата.
     *
     * Ограничивает выбор дат - нельзя выбрать дату раньше указанной.
     * Если `null`, ограничение отсутствует.
     *
     * @example
     * ```typescript
     * // Только будущие даты
     * <DateInput
     *   bind:value={futureDate}
     *   minDate={new Date()}
     * />
     * ```
     */
    minDate?: Date | null;

    /**
     * Максимальная допустимая дата.
     *
     * Ограничивает выбор дат - нельзя выбрать дату позже указанной.
     * Если `null`, ограничение отсутствует.
     *
     * @example
     * ```typescript
     * // Только даты текущего года
     * <DateInput
     *   bind:value={thisYearDate}
     *   maxDate={new Date(2024, 11, 31)}
     * />
     * ```
     */
    maxDate?: Date | null;
  }
</script>

<script lang="ts">
  import { AnimatedText } from "$lib/components";
  import { ArrowIcon, CalendarIcon, CrossIcon } from "$lib/icons";

  import FieldWrapper from "./FieldWrapper.svelte";

  let {
    label,
    placeholder = "Выберите дату",
    required = false,
    value = $bindable(),
    minDate = $bindable(),
    maxDate = $bindable()
  }: DateInputProps = $props();

  // Автоматически устанавливаем текущую дату для обязательных полей
  if (required && value === null) value = new Date();

  /**
   * Уникальный идентификатор компонента.
   *
   * Используется для связывания лейбла с полем ввода для доступности.
   */
  const id: string = $props.id();

  /**
   * Флаг отображения календаря.
   *
   * Управляет видимостью выпадающего календаря.
   * Изменяется при клике на кнопку календаря или нажатии Enter/Space.
   */
  let displayCalendar: boolean = $state(false);

  /**
   * Текущий отображаемый месяц в календаре.
   *
   * Определяет какой месяц показывается в календаре.
   * Инициализируется выбранной датой или текущей датой.
   */
  let displayedMonth: Date = $state(value || new Date());

  /**
   * Список дат для отображения в календаре.
   *
   * Производное состояние, автоматически пересчитывается при изменении displayedMonth.
   * Содержит все даты текущего отображаемого месяца.
   */
  let displayedDates: Date[] = $derived(getMonthDates(displayedMonth));

  /**
   * Высота календаря для анимации.
   *
   * Используется для плавной анимации появления/исчезновения календаря.
   * Привязывается к реальной высоте содержимого календаря.
   */
  let calendarHeight: number = $state(0);

  /**
   * Флаг пустого значения.
   *
   * Определяет, выбрана ли дата. Используется для стилизации и валидации.
   */
  let empty = $derived(value === null);

  /**
   * Флаг фокуса на поле.
   *
   * Отслеживает состояние фокуса для стилизации и управления календарем.
   */
  let focused = $state(false);

  /**
   * Возвращает список дат в указанный месяц.
   *
   * Генерирует массив Date объектов для всех дней указанного месяца.
   * Используется для отображения календаря.
   *
   * @param date - Дата, для которой нужно получить список дней месяца
   * @returns Массив дат текущего месяца
   *
   * @example
   * ```typescript
   * const dates = getMonthDates(new Date(2024, 0)); // Январь 2024
   * // Возвращает [1 января, 2 января, ..., 31 января]
   * ```
   */
  function getMonthDates(date: Date): Date[] {
    const dayCount: number = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    let result: Date[] = [];
    for (let i = 0; i < dayCount; ++i) {
      result.push(new Date(date.getFullYear(), date.getMonth(), i + 1));
    }

    return result;
  }

  /**
   * Сдвигает текущий отображаемый месяц.
   *
   * Изменяет отображаемый месяц в календаре на указанное количество месяцев.
   * Поддерживает как положительные (вперед), так и отрицательные (назад) значения.
   *
   * @param months - Количество месяцев для сдвига (положительное - вперед, отрицательное - назад)
   *
   * @example
   * ```typescript
   * // Переход к следующему месяцу
   * shiftDisplayedMonth(1);
   *
   * // Переход к предыдущему месяцу
   * shiftDisplayedMonth(-1);
   *
   * // Переход на 3 месяца вперед
   * shiftDisplayedMonth(3);
   * ```
   */
  function shiftDisplayedMonth(months: number): undefined {
    const newMonthIndex = displayedMonth.getMonth() + months;
    displayedMonth = new Date(displayedMonth.setMonth(newMonthIndex));
  }

  /**
   * Сравнивает две даты на равенство.
   *
   * Проверяет, представляют ли две даты один и тот же день.
   * Сравнение происходит по году, месяцу и дню (время игнорируется).
   *
   * @param date1 - Первая дата для сравнения
   * @param date2 - Вторая дата для сравнения
   * @returns true, если даты представляют один день
   *
   * @example
   * ```typescript
   * const date1 = new Date(2024, 0, 15, 10, 30); // 15 января 2024, 10:30
   * const date2 = new Date(2024, 0, 15, 14, 45); // 15 января 2024, 14:45
   *
   * isDatesEqual(date1, date2); // true - один и тот же день
   * ```
   */
  function isDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  /**
   * Проверяет, доступна ли дата для выбора.
   *
   * Определяет, можно ли выбрать указанную дату с учетом ограничений minDate и maxDate.
   * Дата недоступна, если она раньше minDate или позже maxDate.
   *
   * @param date - Дата для проверки доступности
   * @returns true, если дата доступна для выбора
   *
   * @example
   * ```typescript
   * const minDate = new Date(2024, 0, 1);  // 1 января 2024
   * const maxDate = new Date(2024, 11, 31); // 31 декабря 2024
   *
   * isDateAvailable(new Date(2024, 5, 15)); // true - в пределах диапазона
   * isDateAvailable(new Date(2023, 11, 31)); // false - раньше minDate
   * isDateAvailable(new Date(2025, 0, 1));   // false - позже maxDate
   * ```
   */
  function isDateAvailable(date: Date): boolean {
    return (
      (minDate ? date > minDate : true) && (maxDate ? date < maxDate : true)
    );
  }
</script>

<!--
  Основной контейнер поля ввода даты.

  Использует FieldWrapper для обеспечения доступности и стилизации.
  Поддерживает клавиатурную навигацию (Enter/Space для открытия календаря).
-->
<FieldWrapper {id} {label} bind:focused bind:empty>
  <div
    class="size-full outline-none flex flex-col"
    role="button"
    tabindex="0"
    onfocusin={() => (focused = true)}
    onfocusout={() => (focused = false)}
    onkeydown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        displayCalendar = !displayCalendar;
      }
    }}
  >
    <!--
      Панель управления календарем.

      Отображает либо навигацию по месяцам (когда календарь открыт),
      либо выбранную дату с кнопкой открытия календаря.
    -->
    <div class="px-4 py-3 size-full flex justify-between items-center">
      {#if displayCalendar}
        <!-- Навигация по месяцам -->

        <!-- Кнопка "Предыдущий месяц" -->
        <button
          type="button"
          onclick={() => shiftDisplayedMonth(-1)}
          class="w-4 fill-neutral-900! cursor-pointer animate-slide-left"
          aria-label="Предыдущий месяц"
        >
          <ArrowIcon />
        </button>

        <!-- Отображение текущего месяца и года -->
        <p class="w-34 text-center leading-4.5 animate-slide-up">
          <AnimatedText
            base="words"
            value={displayedMonth.toLocaleString("ru-RU", {
              month: "long",
              year: "numeric"
            })}
          />
        </p>

        <!-- Кнопка "Следующий месяц" -->
        <button
          type="button"
          onclick={() => shiftDisplayedMonth(1)}
          class="w-4 fill-neutral-900! cursor-pointer animate-slide-right"
          aria-label="Следующий месяц"
        >
          <div class="-scale-100"><ArrowIcon /></div>
        </button>

        <!-- Кнопка закрытия календаря -->
        <button
          type="button"
          onclick={() => (displayCalendar = false)}
          class="group size-4 stroke-neutral-900! hover:stroke-primary-500! cursor-pointer transition-colors duration-150"
          aria-label="Закрыть календарь"
        >
          <div class="group-hover:rotate-90 transition-transform duration-150">
            <CrossIcon />
          </div>
        </button>
      {:else}
        <!-- Отображение выбранной даты или placeholder -->

        <p
          {id}
          class="leading-4.5 text-neutral-900 focus:outline-none select-none cursor-default"
          class:text-black={!value}
        >
          {value ? value.toLocaleDateString("ru-RU") : placeholder}
        </p>

        <!-- Кнопка открытия календаря -->
        <button
          type="button"
          onclick={() => (displayCalendar = true)}
          class="size-4 fill-neutral-900! hover:fill-primary-500! cursor-pointer transition-colors duration-150"
          aria-label="Открыть календарь"
        >
          <CalendarIcon />
        </button>
      {/if}
    </div>

    <!--
      Выпадающий календарь.

      Анимированное появление/исчезновение с плавным изменением высоты.
      Содержит сетку дат текущего месяца с поддержкой ограничений.
    -->
    <div
      style="height: {displayCalendar ? calendarHeight : 0}px;"
      class="left-0 top-8 size-full overflow-hidden transition-all duration-200 ease-out"
    >
      <ul
        class="px-2 pt-4 pb-2 grid grid-cols-7 transition-all duration-200 ease-out"
        style="
          filter: blur({displayCalendar ? 0 : 2}px);
          opacity: {displayCalendar ? 100 : 0}%;
        "
        bind:clientHeight={calendarHeight}
      >
        {#each displayedDates as date, index (index)}
          <li class="group relative">
            <button
              type="button"
              onclick={() => (value = date)}
              class="size-full hover:bg-primary-500 disabled:!bg-neutral-600 text-center disabled:text-neutral-300 cursor-pointer disabled:cursor-not-allowed select-none transition-colors duration-200"
              class:bg-primary-500={value && isDatesEqual(value, date)}
              disabled={!isDateAvailable(date)}
            >
              {index + 1}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</FieldWrapper>
