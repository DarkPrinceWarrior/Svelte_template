/**
 * Преобразует байты в удобочитаемую строку.
 * @param bytes - Количество байт.
 * @return Строка для отображения количества памяти
 */
export function bytesToString(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;

  const kb = bytes / 1024;
  if (kb < 1024) return `${parseFloat(kb.toFixed(1))} Кб`;

  const mb = kb / 1024;
  return `${parseFloat(mb.toFixed(1))} Мб`;
}
