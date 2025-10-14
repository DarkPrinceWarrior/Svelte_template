/**
 * @fileoverview Ошибка таймаута (HTTP 408) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра TimeoutError.
 *
 * Содержит параметры, специфичные для ошибки таймаута запроса.
 *
 * @example
 * ```typescript
 * const errorParams: TimeoutErrorParams = {
 *   detail: "Сервер не ответил в течение 30 секунд"
 * };
 * ```
 */
export interface TimeoutErrorParams {
  /**
   * Детальное сообщение об ошибке таймаута.
   *
   * Дополнительная информация о причине превышения времени ожидания.
   * Может содержать рекомендации по оптимизации запроса.
   */
  detail?: string;
};

/**
 * Ошибка таймаута (HTTP 408).
 *
 * Возникает когда сервер не смог обработать запрос в установленное время.
 * Обычно указывает на проблемы с производительностью или перегрузку сервера.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки таймаута
 * const error = new TimeoutError({
 *   detail: "Сервер не ответил в течение 30 секунд"
 * });
 * 
 * console.log(error.message); // "Превышено время ожидания. (408) : Сервер не ответил в течение 30 секунд"
 * console.log(error.status);  // 408
 * ```
 */
export class TimeoutError extends FetchError {
  /**
   * Создает новый экземпляр TimeoutError.
   *
   * Инициализирует ошибку таймаута с HTTP статус-кодом 408.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке таймаута
   */
  constructor({ detail }: TimeoutErrorParams) {
    super({ detail, message: "Превышено время ожидания.", status: 408 });
    this.name = 'TimeoutError';
  }
}
