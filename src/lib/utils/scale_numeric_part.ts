/**
 * Умножает циферную часть строки
 *
 * @param str Строка
 * @param multiplier Множитель
 * @returns Строку с умноженной циферной частью на указанный множитель
 */
export function scaleNumericPart(str: string, multiplier: number): string {
  const match = str.match(/(\d+)/);
  if (!match) return str;

  const numStr = match[1];
  const scaledNum = Number(numStr) * multiplier;

  const scaledStr = Number.isInteger(scaledNum)
    ? scaledNum.toString()
    : scaledNum.toString();

  return str.slice(0, match.index!) + scaledStr + str.slice(match.index! + numStr.length);
}
