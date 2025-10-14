/**
 * @fileoverview Центральный модуль для экспорта всех HTTP ошибок
 * @author Буравов Илья (ilburale@gmail.com)
 *
 * Этот модуль предоставляет единую точку входа для всех типов HTTP ошибок,
 * используемых в API клиенте. Все ошибки наследуются от базового класса
 * FetchError и предоставляют типизированную обработку различных HTTP статус-кодов.
 */

// Базовый класс и интерфейсы
export * from "./fetch_error";

// Специализированные ошибки по HTTP статус-кодам
export * from "./not_authorized_error";         // 401
export * from "./forbidden_error";              // 403
export * from "./timeout_error";                // 408
export * from "./content_too_large_error";      // 413
export * from "./unsupported_media_type_error"; // 415
export * from "./teapot_error";                 // 418
export * from "./too_many_requests";            // 429
export * from "./internal_error";               // 500
export * from "./service_unavailable";          // 503
