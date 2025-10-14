/**
 * @fileoverview Ошибка отсутствия токена обновления
 * @author Буравов Илья (ilburale@gmail.com)
 */

/**
 * Ошибка отсутствия токена обновления.
 *
 * Возникает когда приложение пытается получить токен обновления
 * из локального хранилища, но токен отсутствует или был удален.
 * Обычно указывает на необходимость повторной авторизации.
 *
 * @example
 * ```typescript
 * try {
 *   await authAPI.refresh();
 * } catch (error) {
 *   if (error instanceof RefreshTokenMissingError) {
 *     // Перенаправить на страницу входа
 *     redirectToLogin();
 *   }
 * }
 * ```
 */
export class RefreshTokenMissingError extends Error {
  /**
   * Создает новый экземпляр RefreshTokenMissingError.
   *
   * Инициализирует ошибку отсутствия токена обновления.
   */
  constructor() {
    super("Токен обновления отсутвует в локальном хранилище.");
    this.name = 'RefreshTokenMissingError';
  }
}
