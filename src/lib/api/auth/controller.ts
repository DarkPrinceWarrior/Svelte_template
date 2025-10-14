/**
 * @fileoverview API контроллер для аутентификации пользователей
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { API } from "$lib/api/base";

import {
  AccessTokenMissingError,
  RefreshTokenMissingError,
  WrongCredentialsError
} from "./errors";

import type {
  Credentials,
  Tokens
} from "./schemas";

import { env } from "$env/dynamic/public";

/**
 * API контроллер для работы с аутентификацией пользователей.
 *
 * Предоставляет методы для авторизации, обновления токенов, проверки
 * действительности токенов и выхода из системы. Автоматически управляет
 * токенами в локальном хранилище браузера.
 *
 * @example
 * ```typescript
 * import { AuthAPI } from '$lib/api/auth';
 *
 * const authAPI = new AuthAPI();
 *
 * // Авторизация пользователя
 * await authAPI.login({ login: "user@example.com", password: "password" });
 *
 * // Проверка действительности токена
 * const isValid = await authAPI.verify();
 *
 * // Выход из системы
 * await authAPI.logout();
 * ```
 */
export class AuthAPI extends API {
  /**
   * Базовый URL для запросов к API аутентификации.
   *
   * Формируется на основе переменной окружения PUBLIC_API_BASE_URL
   * с добавлением пути "/auth".
   */
  private static readonly baseURL: string = `${env.PUBLIC_API_BASE_URL}/auth`;

  /**
   * Ключ для хранения токена доступа в localStorage.
   *
   * Используется для сохранения и получения токена доступа
   * из локального хранилища браузера.
   */
  private static readonly localStorageAccessTokenKey: string = 'access-token';

  /**
   * Ключ для хранения токена обновления в localStorage.
   *
   * Используется для сохранения и получения токена обновления
   * из локального хранилища браузера.
   */
  private static readonly localStorageRefreshTokenKey: string = 'refresh-token';

  /**
   * Возвращает токен доступа из локального хранилища.
   *
   * Извлекает токен доступа из localStorage браузера.
   * Если токен отсутствует, выбрасывает AccessTokenMissingError.
   *
   * @returns Токен доступа для авторизации запросов
   *
   * @throws {AccessTokenMissingError} Если токен отсутствует в localStorage
   *
   * @example
   * ```typescript
   * try {
   *   const token = await authAPI.getAccessToken();
   *   console.log('Токен доступа:', token);
   * } catch (error) {
   *   if (error instanceof AccessTokenMissingError) {
   *     // Перенаправить на страницу входа
   *     redirectToLogin();
   *   }
   * }
   * ```
   */
  public async getAccessToken(): Promise<string> {
    const accessToken = localStorage.getItem(AuthAPI.localStorageAccessTokenKey);
    if (!accessToken) throw new AccessTokenMissingError();

    return accessToken;
  }

  /**
   * Авторизирует пользователя в системе.
   *
   * Отправляет учетные данные на сервер для аутентификации.
   * При успешной авторизации сохраняет полученные токены в localStorage.
   * При неверных учетных данных выбрасывает WrongCredentialsError.
   *
   * @param credentials - Учетные данные пользователя (логин и пароль)
   *
   * @throws {WrongCredentialsError} При неверных учетных данных
   * @throws {FetchError} При других ошибках HTTP запроса
   *
   * @example
   * ```typescript
   * try {
   *   await authAPI.login({
   *     login: "user@example.com",
   *     password: "securePassword123"
   *   });
   *   console.log("Авторизация успешна");
   * } catch (error) {
   *   if (error instanceof WrongCredentialsError) {
   *     showErrorMessage("Неверный логин или пароль");
   *   }
   * }
   * ```
   */
  public async login(credentials: Credentials): Promise<void> {
    const url = new URL(`${AuthAPI.baseURL}/login`);
    const init: RequestInit = {
      method: "POST",
      body: JSON.stringify(credentials)
    };

    try {
      const response = await this.fetch(url, init);
      const body = await response.json();
      AuthAPI.storeTokens(body);
    } catch (error: any) {
      if (error.status === 401) {
        throw new WrongCredentialsError();
      }
      else {
        throw error;
      }
    }
  }

  /**
   * Обновляет токен доступа с помощью токена обновления.
   *
   * Использует токен обновления для получения нового токена доступа
   * без повторной авторизации. Новые токены автоматически сохраняются
   * в localStorage.
   *
   * @throws {RefreshTokenMissingError} Если токен обновления отсутствует
   * @throws {FetchError} При ошибках HTTP запроса
   *
   * @example
   * ```typescript
   * try {
   *   await authAPI.refresh();
   *   console.log("Токен успешно обновлен");
   * } catch (error) {
   *   if (error instanceof RefreshTokenMissingError) {
   *     // Перенаправить на страницу входа
   *     redirectToLogin();
   *   }
   * }
   * ```
   */
  public async refresh(): Promise<void> {
    const url = new URL(`${AuthAPI.baseURL}/refresh`);
    const init: RequestInit = {
      method: "POST",
      headers: { "Authorization": AuthAPI.getRefreshToken() },
    };

    const response = await this.fetch(url, init);
    const body = await response.json();

    AuthAPI.storeTokens(body);
  }

  /**
   * Проверяет действительность текущего токена доступа.
   *
   * Отправляет запрос на сервер для проверки валидности токена доступа.
   * Возвращает true если токен действителен, false в противном случае.
   *
   * @returns true если токен действителен, иначе false
   *
   * @throws {AccessTokenMissingError} Если токен доступа отсутствует
   * @throws {FetchError} При ошибках HTTP запроса
   *
   * @example
   * ```typescript
   * try {
   *   const isValid = await authAPI.verify();
   *   if (isValid) {
   *     console.log("Пользователь авторизован");
   *   } else {
   *     console.log("Токен недействителен");
   *   }
   * } catch (error) {
   *   console.error("Ошибка проверки токена:", error);
   * }
   * ```
   */
  public async verify(): Promise<boolean> {
    const url = new URL(`${AuthAPI.baseURL}/verify`);
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Authorization": await this.getAccessToken()
      }
    };

    const response = await this.fetch(url, init);
    return await response.json();
  }

  /**
   * Деавторизирует текущего пользователя.
   *
   * Отправляет запрос на сервер для завершения сессии и удаляет
   * все токены из localStorage. После вызова этого метода
   * пользователь будет считаться неавторизованным.
   *
   * @throws {AccessTokenMissingError} Если токен доступа отсутствует
   * @throws {FetchError} При ошибках HTTP запроса
   *
   * @example
   * ```typescript
   * try {
   *   await authAPI.logout();
   *   console.log("Выход выполнен успешно");
   *   // Перенаправить на страницу входа
   *   redirectToLogin();
   * } catch (error) {
   *   console.error("Ошибка при выходе:", error);
   * }
   * ```
   */
  public async logout(): Promise<void> {
    const url = new URL(`${AuthAPI.baseURL}/logout`);
    const init: RequestInit = {
      method: "POST",
      headers: { "Authorization": await this.getAccessToken() }
    };

    await this.fetch(url, init);
    AuthAPI.clearTokens();
  }

  /**
   * Сохраняет токены в локальном хранилище браузера.
   *
   * Принимает объект с токенами и сохраняет их в localStorage
   * с правильным форматированием (тип + токен).
   *
   * @param data - Объект с токенами доступа и обновления
   *
   * @example
   * ```typescript
   * const tokens = {
   *   type: "Bearer",
   *   access: "access_token_here",
   *   refresh: "refresh_token_here"
   * };
   * AuthAPI.storeTokens(tokens);
   * ```
   */
  private static storeTokens(data: Tokens): void {
    const accessToken = `${data.type} ${data.access}`;
    const refreshToken = `${data.type} ${data.refresh}`;

    localStorage.setItem(AuthAPI.localStorageAccessTokenKey, accessToken);
    localStorage.setItem(AuthAPI.localStorageRefreshTokenKey, refreshToken);
  }

  /**
   * Удаляет все токены из локального хранилища.
   *
   * Очищает localStorage от токенов доступа и обновления.
   * Используется при выходе из системы.
   *
   * @example
   * ```typescript
   * AuthAPI.clearTokens();
   * console.log("Токены удалены из localStorage");
   * ```
   */
  private static clearTokens(): void {
    localStorage.removeItem(AuthAPI.localStorageAccessTokenKey);
    localStorage.removeItem(AuthAPI.localStorageRefreshTokenKey);
  }

  /**
   * Возвращает токен обновления из локального хранилища.
   *
   * Извлекает токен обновления из localStorage.
   * Если токен отсутствует, выбрасывает RefreshTokenMissingError.
   *
   * @returns Токен обновления для авторизации запросов
   *
   * @throws {RefreshTokenMissingError} Если токен обновления отсутствует
   *
   * @example
   * ```typescript
   * try {
   *   const refreshToken = AuthAPI.getRefreshToken();
   *   console.log('Токен обновления:', refreshToken);
   * } catch (error) {
   *   console.error('Токен обновления отсутствует');
   * }
   * ```
   */
  private static getRefreshToken(): string {
    const token = localStorage.getItem(AuthAPI.localStorageRefreshTokenKey);
    if (!token) throw new RefreshTokenMissingError();

    return token;
  }
}
