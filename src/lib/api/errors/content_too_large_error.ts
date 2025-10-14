/**
 * @fileoverview Ошибка размера контента (HTTP 413) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра ContentTooLargeError.
 *
 * Содержит параметры, специфичные для ошибки превышения размера контента.
 *
 * @example
 * ```typescript
 * const errorParams: ContentTooLargeErrorParams = {
 *   detail: "Размер файла превышает лимит в 10MB"
 * };
 * ```
 */
export interface ContentTooLargeErrorParams {
  /**
   * Детальное сообщение об ошибке размера контента.
   */
  detail?: string;
};

/**
 * Ошибка размера контента (HTTP 413).
 *
 * Возникает когда размер отправляемых данных превышает лимит,
 * установленный сервером. Обычно связано с загрузкой больших файлов.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки размера контента
 * const error = new ContentTooLargeError({
 *   detail: "Размер файла превышает лимит в 10MB"
 * });
 * 
 * console.log(error.message); // "Слишком большой размер данных. (413) : Размер файла превышает лимит в 10MB"
 * console.log(error.status);  // 413
 * ```
 */
export class ContentTooLargeError extends FetchError {
  /**
   * Создает новый экземпляр ContentTooLargeError.
   *
   * Инициализирует ошибку размера контента с HTTP статус-кодом 413.
   *
   * @param params - Параметры для инициализации ошибки
   */
  constructor({ detail }: ContentTooLargeErrorParams) {
    super({ detail, message: "Слишком большой размер данных.", status: 413 });
    this.name = 'ContentTooLargeError';
  }
}
