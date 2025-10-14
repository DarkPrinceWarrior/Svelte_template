/**
 * @fileoverview Внутренняя ошибка сервера (HTTP 500) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра InternalError.
 *
 * Содержит параметры, специфичные для внутренней ошибки сервера.
 *
 * @example
 * ```typescript
 * const errorParams: InternalErrorParams = {
 *   detail: "Потеряно соединение с базой данных"
 * };
 * ```
 */
export interface InternalErrorParams {
  /**
   * Детальное сообщение о внутренней ошибке сервера.
   *
   * Дополнительная информация о технической ошибке.
   * Может содержать технические детали для разработчиков.
   */
  detail?: string;
};

/**
 * Внутренняя ошибка сервера (HTTP 500).
 *
 * Возникает когда на сервере произошла непредвиденная ошибка,
 * которая не позволяет обработать запрос корректно.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание внутренней ошибки сервера
 * const error = new InternalError({
 *   detail: "Ошибка базы данных: соединение потеряно"
 * });
 * 
 * console.log(error.message); // "Неизвестная ошибка. (500) : Ошибка базы данных: соединение потеряно"
 * console.log(error.status);  // 500
 * ```
 */
export class InternalError extends FetchError {
  /**
   * Создает новый экземпляр InternalError.
   *
   * Инициализирует внутреннюю ошибку сервера с HTTP статус-кодом 500.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение о внутренней ошибке сервера
   */
  constructor({ detail }: InternalErrorParams) {
    super({ detail, message: "Неизвестная ошибка.", status: 500 });
    this.name = 'InternalError';
  }
}
