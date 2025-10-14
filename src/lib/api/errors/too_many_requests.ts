/**
 * @fileoverview Ошибка лимита запросов (HTTP 429) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра TooManyRequestsError.
 *
 * Содержит параметры, специфичные для ошибки превышения лимита запросов.
 *
 * @example
 * ```typescript
 * const errorParams: TooManyRequestsErrorParams = {
 *   detail: "Превышен лимит: 100 запросов в минуту"
 * };
 * ```
 */
export interface TooManyRequestsErrorParams {
  /**
   * Детальное сообщение об ошибке лимита запросов.
   *
   * Дополнительная информация о превышении лимита.
   * Может содержать информацию о времени до сброса лимита.
   */
  detail?: string;
};

/**
 * Ошибка лимита запросов (HTTP 429).
 *
 * Возникает когда клиент превысил лимит количества запросов,
 * установленный сервером (rate limiting).
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки лимита запросов
 * const error = new TooManyRequestsError({
 *   detail: "Превышен лимит: 100 запросов в минуту"
 * });
 * 
 * console.log(error.message); // "Слишком много запросов. (429) : Превышен лимит: 100 запросов в минуту"
 * console.log(error.status);  // 429
 * ```
 */
export class TooManyRequestsError extends FetchError {
  /**
   * Создает новый экземпляр TooManyRequestsError.
   *
   * Инициализирует ошибку лимита запросов с HTTP статус-кодом 429.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке лимита запросов
   */
  constructor({ detail }: TooManyRequestsErrorParams) {
    super({ detail, message: "Слишком много запросов.", status: 429 });
    this.name = 'TooManyRequestsError';
  }
}
