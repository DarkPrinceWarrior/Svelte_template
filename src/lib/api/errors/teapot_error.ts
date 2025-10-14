/**
 * @fileoverview Ошибка "I'm a teapot" (HTTP 418) и связанные интерфейсы
 * @author Буравов Илья (ilburale@gmail.com)
 */

import { FetchError } from "./fetch_error";

/**
 * Интерфейс параметров для создания экземпляра TeapotError.
 *
 * Содержит параметры, специфичные для ошибки "I'm a teapot".
 * Это шуточный HTTP статус-код, используемый для тестирования.
 *
 * @example
 * ```typescript
 * const errorParams: TeapotErrorParams = {
 *   detail: "Сервер не может заварить кофе"
 * };
 * ```
 */
export interface TeapotErrorParams {
  /**
   * Детальное сообщение об ошибке "I'm a teapot".
   *
   * Дополнительная информация о причине ошибки.
   * Обычно содержит юмористическое объяснение.
   */
  detail?: string;
};

/**
 * Ошибка "I'm a teapot" (HTTP 418).
 *
 * Шуточный HTTP статус-код, изначально созданный как первоапрельская шутка.
 * Используется для тестирования обработки нестандартных статус-кодов.
 * Наследуется от базового класса FetchError.
 *
 * @example
 * ```typescript
 * // Создание ошибки "I'm a teapot"
 * const error = new TeapotError({
 *   detail: "Сервер не может заварить кофе"
 * });
 * 
 * console.log(error.message); // "Мы отказываемся варить вам кофе в чайнике. (418) : Сервер не может заварить кофе"
 * console.log(error.status);  // 418
 * ```
 */
export class TeapotError extends FetchError {
  /**
   * Создает новый экземпляр TeapotError.
   *
   * Инициализирует ошибку "I'm a teapot" с HTTP статус-кодом 418.
   *
   * @param params - Параметры для инициализации ошибки
   * @param params.detail - Детальное сообщение об ошибке
   */
  constructor({ detail }: TeapotErrorParams) {
    super({ detail, message: "Мы отказываемся варить вам кофе в чайнике.", status: 418 });
    this.name = 'TeapotError';
  }
}
