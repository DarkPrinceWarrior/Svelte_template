/**
 * @fileoverview Ошибка типа медиа (HTTP 415) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра UnsupportedMediaTypeError.
 *
 * Содержит параметры, специфичные для ошибки неподдерживаемого типа медиа.
 *
 * @example
 * ```typescript
 * const errorParams: UnsupportedMediaTypeErrorParams = {
 *   detail: "Формат файла .xyz не поддерживается"
 * };
 * ```
 */
export interface UnsupportedMediaTypeErrorParams {
  /**
   * Детальное сообщение об ошибке типа медиа.
   *
   * Дополнительная информация о неподдерживаемом формате.
   * Может содержать список поддерживаемых форматов.
   */
  detail?: string;
};

/**
 * Ошибка типа медиа (HTTP 415).
 *
 * Возникает когда сервер не может обработать формат данных,
 * указанный в заголовке Content-Type запроса.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки типа медиа
 * const error = new UnsupportedMediaTypeError({
 *   detail: "Формат файла .xyz не поддерживается"
 * });
 * 
 * console.log(error.message); // "Переданный файл такого формата не поддерживается. (415) : Формат файла .xyz не поддерживается"
 * console.log(error.status);  // 415
 * ```
 */
export class UnsupportedMediaTypeError extends FetchError {
  /**
   * Создает новый экземпляр UnsupportedMediaTypeError.
   *
   * Инициализирует ошибку типа медиа с HTTP статус-кодом 415.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке типа медиа
   */
  constructor({ detail }: UnsupportedMediaTypeErrorParams) {
    super({ detail, message: "Переданный файл такого формата не поддерживается.", status: 415 });
    this.name = 'UnsupportedMediaTypeError';
  }
}
