/**
 * @fileoverview Ошибка доступа запрещен (HTTP 403) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра ForbiddenError.
 *
 * Содержит параметры, специфичные для ошибки запрета доступа.
 *
 * @example
 * ```typescript
 * const errorParams: ForbiddenErrorParams = {
 *   detail: "Недостаточно прав для доступа к ресурсу"
 * };
 * ```
 */
export interface ForbiddenErrorParams {
  /**
   * Детальное сообщение об ошибке запрета доступа.
   *
   * Дополнительная информация о причинах запрета доступа.
   * Может содержать информацию о требуемых правах доступа.
   */
  detail?: string;
};

/**
 * Ошибка доступа запрещен (HTTP 403).
 *
 * Возникает когда сервер понимает запрос, но отказывается его выполнить
 * из-за недостаточных прав доступа. В отличие от 401, аутентификация
 * прошла успешно, но у пользователя нет прав на выполнение операции.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки запрета доступа
 * const error = new ForbiddenError({
 *   detail: "Недостаточно прав для доступа к ресурсу"
 * });
 * 
 * console.log(error.message); // "Доступ запрещен. (403) : Недостаточно прав для доступа к ресурсу"
 * console.log(error.status);  // 403
 * ```
 *
 * @example
 * ```typescript
 * // Обработка ошибки запрета доступа
 * try {
 *   const response = await api.fetch('/admin/users');
 * } catch (error) {
 *   if (error instanceof ForbiddenError) {
 *     // Показать сообщение о недостаточных правах
 *     showAccessDeniedMessage();
 *   }
 * }
 * ```
 */
export class ForbiddenError extends FetchError {
  /**
   * Создает новый экземпляр ForbiddenError.
   *
   * Инициализирует ошибку запрета доступа с HTTP статус-кодом 403.
   * Сообщение об ошибке устанавливается автоматически.
   *
   * @param params - Параметры для инициализации ошибки
   *
   * @example
   * ```typescript
   * // Создание ошибки с детальным сообщением
   * const error = new ForbiddenError({
   *   detail: "Требуется роль администратора"
   * });
   * 
   * // Создание ошибки без детального сообщения
   * const simpleError = new ForbiddenError({});
   * ```
   */
  constructor({ detail }: ForbiddenErrorParams) {
    super({ detail, message: "Доступ запрещен.", status: 403 });
    this.name = 'ForbiddenError';
  }
}
