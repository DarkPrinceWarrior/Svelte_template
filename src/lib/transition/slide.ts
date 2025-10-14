/** Импорты ***********************************************/

import { backIn } from "svelte/easing";
import type { EasingFunction } from "svelte/transition";

/** Интерфейсы ********************************************/

/** Параметры перехода 'fly'. */
interface SlideTransitionParams {
  /** Задержка перед началом перехода */
  delay?: number;
  /** Длительность перехода */
  duration?: number;
  /** Функция сглаживания */
  easingFunction?: EasingFunction;
  /** Смещение по x */
  x?: number;
  /** Смещение по y */
  y?: number;
  /** Степень размытия */
  blur?: number;
};

/** Функции ***********************************************/

/** Переход с эффектом полёта. */
export function slide(
  node: HTMLElement,
  {
    delay = 0,
    duration = 400,
    easingFunction = backIn,
    x = 0,
    y = 20,
    blur = 4
  }: SlideTransitionParams
) {
  return {
    delay,
    duration,
    css: (t: number, u: number) => {
      const eased = easingFunction(u);

      return `
        transform:
          translateX(${x * eased}px)
          translateY(${y * eased}px)
          rotateX(${Math.sign(y) * 45 * eased}deg)
          rotateY(${Math.sign(x) * 45 * eased}deg);
        filter: blur(${blur * eased}px);
        opacity: ${(1 - eased) * 100}%;
      `;
    }
  }
}
