/**
 * @fileoverview Центральный модуль для экспорта ошибок аутентификации
 * @author Буравов Илья (ilburale@gmail.com)
 * 
 * Этот модуль предоставляет единую точку входа для всех типов ошибок,
 * связанных с аутентификацией. Включает ошибки HTTP запросов и ошибки
 * управления токенами в локальном хранилище.
 * 
 * @example
 * ```typescript
 * import { 
 *   WrongCredentialsError,
 *   AccessTokenMissingError,
 *   RefreshTokenMissingError 
 * } from '$lib/api/auth/errors';
 * 
 * try {
 *   await authAPI.login(credentials);
 * } catch (error) {
 *   if (error instanceof WrongCredentialsError) {
 *     // Обработка неверных учетных данных
 *   } else if (error instanceof AccessTokenMissingError) {
 *     // Обработка отсутствия токена доступа
 *   }
 * }
 * ```
 */

// HTTP ошибки аутентификации
export * from "./wrong_credentials_error";

// Ошибки управления токенами
export * from "./access_token_missing_error";
export * from "./refresh_token_missing_error";
