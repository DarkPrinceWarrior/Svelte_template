/**
 * @fileoverview Базовый модуль для создания API-обёрток с обработкой HTTP-запросов
 * @author Буравов Илья (ilburale@gmail.com)
 *
 * @todo Добавить поддержку retry-логики для неудачных запросов
 * @todo Добавить метрики и логирование запросов
 * @todo Добавить поддержку кэширования ответов
 */

import {
  ContentTooLargeError,
  FetchError,
  ForbiddenError,
  InternalError,
  NotAuthorizedError,
  ServiceUnavailableError,
  TeapotError,
  TimeoutError,
  TooManyRequestsError,
  UnsupportedMediaTypeError
} from "$lib/api/errors";

/**
 * Тип функции для отправки HTTP-запросов на сервер.
 *
 * Соответствует стандартному Web API fetch, но может быть заменена
 * на кастомную реализацию для тестирования или специфических нужд.
 *
 * @param input - URL или объект Request для запроса
 * @param [init] - Дополнительные параметры запроса
 * @returns Промис, разрешающийся с объектом Response
 *
 * @example
 * ```typescript
 * const customFetch: FetchFunction = async (input, init) => {
 *   console.log('Making request to:', input);
 *   return fetch(input, init);
 * };
 * ```
 */
type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

/**
 * Интерфейс параметров для инициализации API объекта.
 *
 * Содержит конфигурационные параметры, необходимые для создания
 * экземпляра базового API класса.
 */
interface APIParams {
  /**
   * Кастомная функция для отправки HTTP-запросов на сервер.
   *
   * Если не указана, будет использована стандартная функция `fetch`.
   * Полезно для тестирования, логирования или использования
   * альтернативных HTTP-клиентов.
   *
   * @default fetch
   *
   * @example
   * ```typescript
   * const apiParams: APIParams = {
   *   fetch: customFetchFunction
   * };
   * ```
   */
  fetch?: FetchFunction;
}

/**
 * Абстрактный базовый класс для создания API-обёрток.
 *
 * Предоставляет унифицированную структуру для отправки HTTP-запросов
 * к серверу с автоматической обработкой ошибок и типизированными
 * исключениями. Должен быть унаследован для реализации конкретных
 * методов API.
 *
 * @example
 * ```typescript
 * // Наследование
 * class UserAPI extends API {
 *   async getUsers(): Promise<User[]> {
 *     const response = await this.fetch('/api/users');
 *     return response.json();
 *   }
 * }
 *
 * const userAPI = new UserAPI({});
 * ```
 *
 * @example
 * ```typescript
 * // Использование с кастомной fetch функцией
 * const customFetch = async (input, init) => {
 *   console.log('Making request:', input);
 *   return fetch(input, init);
 * };
 *
 * const api = new MyAPI({ fetch: customFetch });
 * ```
 */
export abstract class API {
  /**
   * Приватная функция для отправки HTTP-запросов на сервер.
   */
  private fetchFunction: FetchFunction;

  constructor(params?: APIParams) {
    this.fetchFunction = params?.fetch ?? fetch;
  }

  /**
   * Отправляет HTTP-запрос с автоматической обработкой ошибок.
   *
   * Для отправки HTTP-запросов внутри наследованных API-классов должна
   * быть использована именно эта функция. Автоматически обрабатывает
   * HTTP статус-коды и выбрасывает соответствующие типизированные исключения.
   *
   * @param input - URL или объект Request для запроса
   * @param [init] - Дополнительные параметры запроса (опционально)
   *
   * @returns Промис, разрешающийся с объектом Response при успешном запросе
   *
   * @throws {NotAuthorizedError} При статусе 401 (Unauthorized)
   * @throws {ForbiddenError} При статусе 403 (Forbidden)
   * @throws {TimeoutError} При статусе 408 (Request Timeout)
   * @throws {ContentTooLargeError} При статусе 413 (Payload Too Large)
   * @throws {UnsupportedMediaTypeError} При статусе 415 (Unsupported Media Type)
   * @throws {TeapotError} При статусе 418 (I'm a teapot)
   * @throws {TooManyRequestsError} При статусе 429 (Too Many Requests)
   * @throws {InternalError} При статусе 500 (Internal Server Error)
   * @throws {ServiceUnavailableError} При статусе 503 (Service Unavailable)
   * @throws {FetchError} При любом другом неуспешном статусе
   *
   * @example
   * ```typescript
   * class UserAPI extends API {
   *   async getUser(id: string): Promise<User> {
   *     try {
   *       const response = await this.fetch(`/api/users/${id}`);
   *       return await response.json();
   *     } catch (error) {
   *       if (error instanceof NotAuthorizedError) {
   *         // Обработка ошибки авторизации
   *       }
   *       throw error;
   *     }
   *   }
   * }
   * ```
   * 
   * @example
   * ```typescript
   * // POST запрос с данными
   * const response = await this.fetch('/api/users', {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json'
   *   },
   *   body: JSON.stringify({ name: 'John', email: 'john@example.com' })
   * });
   * ```
   */
  protected async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const response = await this.fetchFunction(input, init);

    if (response.ok) return response;

    let detail: string | undefined;

    try {
      const json = await response.json();
      detail = json.detail;
    } catch (error: any) {
      console.error(
        `Не удалось получить детализированное описание ошибки: ${error.message}.`
      );
    }

    throw this.getErrorByStatusCode(response.status, { detail });
  }

  /**
   * Возвращает экземпляр ошибки, соответствующей HTTP статус-коду.
   *
   * Создает типизированное исключение на основе HTTP статус-кода ответа.
   * Используется внутренне методом `fetch` для обработки ошибок.
   *
   * @param {number} status - HTTP статус-код ответа
   * @param {any} [params] - Дополнительные параметры для создания ошибки (опционально)
   *
   * @returns {FetchError} Экземпляр соответствующего класса ошибки
   */
  protected getErrorByStatusCode(status: number, params?: any): FetchError {
    switch (status) {
      case 401:
        return new NotAuthorizedError(params);
      case 403:
        return new ForbiddenError(params);
      case 408:
        return new TimeoutError(params);
      case 413:
        return new ContentTooLargeError(params);
      case 415:
        return new UnsupportedMediaTypeError(params);
      case 418:
        return new TeapotError(params);
      case 429:
        return new TooManyRequestsError(params);
      case 500:
        return new InternalError(params);
      case 503:
        return new ServiceUnavailableError(params);
    }

    return new FetchError(params);
  }
}
