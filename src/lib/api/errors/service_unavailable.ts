/**
 * @fileoverview Ошибка недоступности сервиса (HTTP 503) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра ServiceUnavailableError.
 *
 * Содержит параметры, специфичные для ошибки недоступности сервиса.
 *
 * @example
 * ```typescript
 * const errorParams: ServiceUnavailableErrorParams = {
 *   detail: "Сервис временно недоступен из-за технических работ"
 * };
 * ```
 */
export interface ServiceUnavailableErrorParams {
  /**
   * Детальное сообщение об ошибке недоступности сервиса.
   *
   * Дополнительная информация о причинах недоступности.
   * Может содержать информацию о времени восстановления.
   */
  detail?: string;
};

/**
 * Ошибка недоступности сервиса (HTTP 503).
 *
 * Возникает когда сервер временно не может обработать запрос
 * из-за технических работ, перегрузки или других временных проблем.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки недоступности сервиса
 * const error = new ServiceUnavailableError({
 *   detail: "Сервис временно недоступен из-за технических работ"
 * });
 * 
 * console.log(error.message); // "Сервис недоступен. (503) : Сервис временно недоступен из-за технических работ"
 * console.log(error.status);  // 503
 * ```
 */
export class ServiceUnavailableError extends FetchError {
  /**
   * Создает новый экземпляр ServiceUnavailableError.
   *
   * Инициализирует ошибку недоступности сервиса с HTTP статус-кодом 503.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке недоступности сервиса
   */
  constructor({ detail }: ServiceUnavailableErrorParams) {
    super({ detail, message: "Сервис недоступен.", status: 503 });
    this.name = 'ServiceUnavailableError';
  }
}
