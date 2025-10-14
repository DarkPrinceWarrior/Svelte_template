/**
 * @fileoverview Ошибка неверных учетных данных (HTTP 401)
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "$lib/api/errors";

/**
 * Ошибка неверных учетных данных (HTTP 401).
 *
 * Возникает когда пользователь предоставил неверные логин или пароль
 * при попытке авторизации. Наследуется от FetchError для совместимости
 * с общей системой обработки ошибок API.
 *
 * @example
 * ```typescript
 * try {
 *   await authAPI.login({ login: "user", password: "wrong" });
 * } catch (error) {
 *   if (error instanceof WrongCredentialsError) {
 *     showErrorMessage("Неверный логин или пароль");
 *   }
 * }
 * ```
 */
export class WrongCredentialsError extends FetchError {
  /**
   * Создает новый экземпляр WrongCredentialsError.
   *
   * Инициализирует ошибку неверных учетных данных с HTTP статус-кодом 401.
   */
  constructor() {
    super({ message: "Неверные учётные данные", status: 401 });
    this.name = 'WrongCredentialsError';
  }
}
