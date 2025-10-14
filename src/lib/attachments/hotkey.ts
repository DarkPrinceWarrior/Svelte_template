/**
 * @fileoverview Модуль для работы с горячими клавишами в Svelte
 * @author Буравов Илья (ilburale@gmail.com)
 */

import type { Attachment } from 'svelte/attachments';

import { charToKeyCode } from '$lib/utils';

/**
 * Перечисление действий, выполняемых при нажатии горячей клавиши.
 *
 * Определяет возможные действия, которые могут быть выполнены
 * при активации горячей клавиши на элементе.
 *
 * @example
 * ```typescript
 * // Использование в Svelte компоненте
 * <button {@attach hotkey={{ key: 'Enter', action: HotKeyAction.Click }}}>
 *   Нажмите Enter или кликните
 * </button>
 * ```
 */
export enum HotKeyAction {
  /**
   * Клик по элементу.
   *
   * Выполняет программный клик по элементу, как если бы
   * пользователь нажал на него мышью.
   */
  Click = 'click',

  /**
   * Фокус на элементе.
   *
   * Устанавливает фокус на элемент, делая его активным
   * для ввода с клавиатуры.
   */
  Focus = 'focus'
};

/**
 * Интерфейс параметров для прикрепления горячих клавиш.
 *
 * Содержит все необходимые параметры для настройки горячих клавиш
 * в Svelte компонентах. Поддерживает комбинации клавиш с модификаторами.
 *
 * @example
 * ```typescript
 * // Простая горячая клавиша
 * const simpleHotkey: HotKeyParams = {
 *   key: 'Enter',
 *   action: HotKeyAction.Click
 * };
 * 
 * // Комбинация клавиш
 * const complexHotkey: HotKeyParams = {
 *   key: 's',
 *   action: HotKeyAction.Click,
 *   ctrl: true,
 *   shift: true
 * };
 * ```
 */
export interface HotKeyParams {
  /**
   * Основная клавиша для активации.
   *
   * Символ клавиши, который должен быть нажат для активации
   * горячей клавиши. Поддерживает стандартные символы (a-z, 0-9)
   * и специальные клавиши (Enter, Escape, Space, etc.).
   */
  key?: string;

  /**
   * Действие, выполняемое при нажатии горячей клавиши.
   *
   * Определяет, какое действие будет выполнено при активации
   * горячей клавиши. По умолчанию - Click.
   */
  action?: HotKeyAction;

  /**
   * Флаг модификатора Shift.
   *
   * Если true, горячая клавиша активируется только при одновременном
   * нажатии клавиши Shift.
   */
  shift?: boolean;

  /**
   * Флаг модификатора Control.
   *
   * Если true, горячая клавиша активируется только при одновременном
   * нажатии клавиши Ctrl (или Cmd на Mac).
   */
  ctrl?: boolean;

  /**
   * Флаг модификатора Alt.
   *
   * Если true, горячая клавиша активируется только при одновременном
   * нажатии клавиши Alt (или Option на Mac).
   */
  alt?: boolean;

  /**
   * Флаг модификатора Meta.
   *
   * Если true, горячая клавиша активируется только при одновременном
   * нажатии клавиши Meta (Cmd на Mac, Win на Windows).
   */
  meta?: boolean;
};

/**
 * Svelte прикрепление для обработки горячих клавиш.
 *
 * Создает прикрепление, которое позволяет элементам реагировать
 * на нажатие клавиш и их комбинаций. Поддерживает модификаторы
 * (Ctrl, Alt, Shift, Meta) и различные действия (клик, фокус).
 * Автоматически игнорирует нажатия, когда фокус находится на
 * элементах ввода (input, textarea, select).
 *
 * @param params - Параметры настройки горячей клавиши
 *
 * @returns Svelte прикрепление для использования в {@attach ...} директиве
 *
 * @example
 * ```svelte
 * <!-- Простая горячая клавиша -->
 * <button {@attach hotkey={{ key: 'Enter' }}>
 *   Нажмите Enter
 * </button>
 *
 * <!-- Комбинация клавиш -->
 * <button {@attach hotkey={{ key: 's', ctrl: true, shift: true }}}>
 *   Ctrl+Shift+S
 * </button>
 *
 * <!-- Фокус вместо клика -->
 * <input {@attach hotkey={{ key: 'f', action: HotKeyAction.Focus }}} />
 * ```
 *
 * @example
 * ```typescript
 * // Программное создание прикрепления
 * const hotkeyAttachment = hotkey({
 *   key: 'Escape',
 *   action: HotKeyAction.Click,
 *   ctrl: true
 * });
 *
 * // Применение к элементу
 * const element = document.querySelector('#my-button');
 * const cleanup = hotkeyAttachment(element);
 *
 * // Очистка при необходимости
 * cleanup();
 * ```
 */
export function hotkey({
  key,
  action = HotKeyAction.Click,
  ctrl = false,
  alt = false,
  shift = false,
  meta = false
}: HotKeyParams): Attachment {
  /**
   * Проверяет, является ли элемент полем ввода.
   *
   * Определяет, находится ли фокус на элементе, который предназначен
   * для ввода текста. В таких случаях горячие клавиши не должны
   * срабатывать, чтобы не мешать пользователю при вводе.
   *
   * @param element - Элемент для проверки
   * @returns true если элемент является полем ввода
   */
  const isInputElement = (element: EventTarget): boolean => {
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    );
  };

  return (element: EventTarget) => {
    /**
     * Обработчик события нажатия клавиши.
     *
     * Проверяет соответствие нажатой клавиши и модификаторов
     * заданным параметрам и выполняет соответствующее действие.
     * Игнорирует нажатия, когда фокус находится на элементах ввода.
     *
     * @param event - Событие нажатия клавиши
     */
    const eventListener = (event: KeyboardEvent) => {
      // Преобразуем символ клавиши в код клавиши
      const keyCode = charToKeyCode(key as string);

      // Игнорируем нажатия, когда текущий фокус на элементе ввода
      if (document.activeElement && isInputElement(document.activeElement)) {
        return;
      }

      // Проверяем соответствие клавиши и модификаторов
      if (
        event.code === keyCode &&
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift &&
        event.metaKey === meta
      ) {
        // Предотвращаем стандартное поведение браузера
        event.preventDefault();
        event.stopPropagation();

        // Выполняем действие в зависимости от типа
        const target = element as HTMLElement;
        switch (action) {
          case HotKeyAction.Click:
            target.click();
            break;
          case HotKeyAction.Focus:
            target.focus();
            break;
        }
      }
    };

    // Проверяем валидность клавиши перед добавлением слушателя
    if (!key || !charToKeyCode(key)) {
      return;
    }

    // Добавляем слушатель события
    document.addEventListener('keydown', eventListener as EventListener);

    // Возвращаем функцию очистки
    return () => {
      document.removeEventListener('keydown', eventListener as EventListener);
    };
  };
}
