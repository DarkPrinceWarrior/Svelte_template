/**
 * @fileoverview Ошибка авторизации (HTTP 401) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра NotAuthorizedError.
 *
 * Содержит параметры, специфичные для ошибки авторизации.
 * Наследует базовую структуру от FetchErrorParams.
 *
 * @example
 * ```typescript
 * const errorParams: NotAuthorizedErrorParams = {
 *   detail: "Неверный токен доступа"
 * };
 * ```
 */
export interface NotAuthorizedErrorParams {
  /**
   * Детальное сообщение об ошибке авторизации.
   *
   * Дополнительная информация о причине отказа в авторизации.
   * Может содержать рекомендации по исправлению проблемы.
   */
  detail?: string;
};

/**
 * Ошибка авторизации (HTTP 401).
 *
 * Возникает когда сервер требует аутентификации для доступа к ресурсу,
 * но запрос не содержит корректных учетных данных или токен доступа истек.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки авторизации
 * const error = new NotAuthorizedError({
 *   detail: "Токен доступа истек"
 * });
 * 
 * console.log(error.message); // "Не авторизован. (401) : Токен доступа истек"
 * console.log(error.status);  // 401
 * ```
 *
 * @example
 * ```typescript
 * // Обработка ошибки авторизации
 * try {
 *   const response = await api.fetch('/protected-resource');
 * } catch (error) {
 *   if (error instanceof NotAuthorizedError) {
 *     // Перенаправить на страницу входа
 *     redirectToLogin();
 *   }
 * }
 * ```
 */
export class NotAuthorizedError extends FetchError {
  /**
   * Создает новый экземпляр NotAuthorizedError.
   *
   * Инициализирует ошибку авторизации с HTTP статус-кодом 401.
   * Сообщение об ошибке устанавливается автоматически.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке авторизации
   *
   * @example
   * ```typescript
   * // Создание ошибки с детальным сообщением
   * const error = new NotAuthorizedError({
   *   detail: "Неверный формат токена"
   * });
   * 
   * // Создание ошибки без детального сообщения
   * const simpleError = new NotAuthorizedError({});
   * ```
   */
  constructor({ detail }: NotAuthorizedErrorParams) {
    super({ detail, message: "Не авторизован.", status: 401 });
    this.name = 'NotAuthorizedError';
  }
}
