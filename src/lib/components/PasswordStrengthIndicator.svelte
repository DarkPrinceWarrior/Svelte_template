<script lang="ts">
  /** Импорты ***********************************************/

  import { slide as svelteSlide } from "svelte/transition";

  import { slide } from "$lib/transition";

  /** Интерфейсы ********************************************/

  /** Свойства компонента `PasswordStrengthIndicator` */
  interface PasswordStrengthIndicatorProps {
    /** Оценивающееся значение */
    value: string | null;
  }

  /** Свойства **********************************************/

  const { value = $bindable() }: PasswordStrengthIndicatorProps = $props();

  /** Производные состояния *********************************/

  let strength = $derived(getPasswordScore(value || ""));

  /** Константы *********************************************/

  const labels = ["Слабый", "Нормальный", "Сильный"];
  const bgColors = ["bg-red-700", "bg-yellow-500", "bg-green-600"];
  const textColors = ["text-red-700", "text-yellow-500", "text-green-600"];

  /** Функции ***********************************************/

  /** Проверяет минимальные требования к паролю */
  function getEntropyScale(pwd: string): number {
    let scale = 0.2;

    if (/[a-z]/.test(pwd)) scale += 0.2;
    if (/[A-Z]/.test(pwd)) scale += 0.2;
    if (/[0-9]/.test(pwd)) scale += 0.2;
    if (/[^a-zA-Z0-9]/.test(pwd)) scale += 0.2;

    return scale;
  }

  /** Расчитывает энтропию пароля */
  function calculatePasswordEntropy(pwd: string): number {
    if (pwd.length === 0) return 0;

    let charsetSize = 0;

    if (/[a-z]/.test(pwd)) charsetSize += 26;
    if (/[A-Z]/.test(pwd)) charsetSize += 26;
    if (/[0-9]/.test(pwd)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 32;

    return pwd.length * Math.log2(charsetSize);
  }

  /** Возвращает силу пароля */
  function getPasswordScore(pwd: string): number {
    const entropy = calculatePasswordEntropy(pwd) * getEntropyScale(pwd);

    if (entropy === 0) return -1;
    if (entropy < 48) return 0;
    if (entropy < 62) return 1;
    return 2;
  }
</script>

<div class="w-full mx-auto mt-2 px-1">
  <div class="flex gap-1">
    {#each { length: 3 } as _, score (score)}
      <div
        class="w-full h-1 {bgColors[
          strength
        ]} rounded transition-colors duration-150"
        class:bg-gray-200!={score > strength}
      ></div>
    {/each}
  </div>

  {#if strength > -1}
    <div transition:svelteSlide={{ duration: 50 }}>
      <p
        class="mt-1 text-sm {textColors[
          strength
        ]} transition-colors duration-150"
        transition:slide={{ duration: 150, x: -32, y: 0 }}
      >
        {labels[strength]}
      </p>
    </div>
  {/if}
</div>
