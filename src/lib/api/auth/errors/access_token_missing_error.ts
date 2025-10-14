/**
 * @fileoverview Ошибка отсутствия токена доступа
 * @author Буравов Илья (ilburale@gmail.com)
 */

/**
 * Ошибка отсутствия токена доступа.
 *
 * Возникает когда приложение пытается получить токен доступа
 * из локального хранилища, но токен отсутствует или был удален.
 * Обычно указывает на необходимость повторной авторизации.
 *
 * @example
 * ```typescript
 * try {
 *   const token = await authAPI.getAccessToken();
 * } catch (error) {
 *   if (error instanceof AccessTokenMissingError) {
 *     // Перенаправить на страницу входа
 *     redirectToLogin();
 *   }
 * }
 * ```
 */
export class AccessTokenMissingError extends Error {
  /**
   * Создает новый экземпляр AccessTokenMissingError.
   *
   * Инициализирует ошибку отсутствия токена доступа.
   */
  constructor() {
    super("Токен доступа отсутвует в локальном хранилище.");
    this.name = 'AccessTokenMissingError';
  }
}
