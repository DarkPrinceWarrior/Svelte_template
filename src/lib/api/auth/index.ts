/**
 * @fileoverview Центральный модуль для экспорта API аутентификации
 * @author Буравов Илья (ilburale@gmail.com)
 * 
 * Этот модуль предоставляет единую точку входа для всех компонентов
 * системы аутентификации, включая основной API контроллер и связанные типы.
 * 
 * @example
 * ```typescript
 * import { AuthAPI } from '$lib/api/auth';
 * import type { Credentials, Tokens } from '$lib/api/auth';
 * 
 * const authAPI = new AuthAPI({});
 * 
 * // Авторизация
 * await authAPI.login({ login: "user@example.com", password: "password" });
 * 
 * // Проверка токена
 * const isValid = await authAPI.verify();
 * 
 * // Выход
 * await authAPI.logout();
 * ```
 */

export { AuthAPI } from "./controller";
