<script lang="ts">
  /** Типы **************************************************/

  /** Цветовая схема кнопки */
  type HotKeyTagColorScheme =
    | "primary"
    | "secondary"
    | "tertiary"
    | "neutral"
    | "negative"
    | "transparent";

  /** Интерфейсы ********************************************/

  /** Свойства компонента `HotKeyTag` */
  interface HotKeyTagProps {
    /** Цветовая схема */
    colorScheme: HotKeyTagColorScheme;
    /** Горячая клавиша */
    key: string;
    /** Флаг, указывающий что для активации горячей клавишы необходимо зажать `shift` */
    shift?: boolean;
    /** Флаг, указывающий что для активации горячей клавишы необходимо зажать `control` */
    ctrl?: boolean;
    /** Флаг, указывающий что для активации горячей клавишы необходимо зажать `alt` */
    alt?: boolean;
    /** Флаг, указывающий что для активации горячей клавишы необходимо зажать `meta` */
    meta?: boolean;
  }

  /** Свойства **********************************************/

  const { colorScheme, key, shift, ctrl, alt, meta }: HotKeyTagProps = $props();

  /** Константы *********************************************/

  const onMac = navigator.platform === "MacIntel";
</script>

<div
  class="hotkey-{colorScheme} border rounded-md px-1 h-6 min-w-6 flex justify-center items-center"
>
  {shift && "⇧"}{ctrl && "^"}{alt && (onMac ? "⌥" : "⎇")}{meta &&
    (onMac ? "⌘" : "⊞")}{key}
</div>

<style>
  @reference '$lib/styles/global.css';

  .hotkey-primary {
    @apply border-hotkey-secondary-border group-disabled:border-neutral-800/4 bg-hotkey-primary-bg group-disabled:bg-neutral-800/2 text-primary-50 group-disabled:text-neutral-800/7;
  }

  .hotkey-secondary {
    @apply border-hotkey-secondary-border group-disabled:border-neutral-800/4 bg-hotkey-secondary-bg group-disabled:bg-neutral-800/2 text-hotkey-secondary-content group-disabled:text-neutral-800/7;
  }

  .hotkey-tertiary {
    @apply border-neutral-400 group-disabled:border-neutral-800/4 bg-neutral-200 group-disabled:bg-neutral-800/2 text-neutral-800 group-disabled:text-neutral-800/7;
  }

  .hotkey-neutral {
    @apply border-neutral-400 group-disabled:border-neutral-800/4 bg-neutral-200 group-disabled:bg-neutral-800/2 text-neutral-800 group-disabled:text-neutral-800/7;
  }

  .hotkey-negative {
    @apply border-tag-negative-bg group-disabled:border-neutral-800/4 bg-tag-negative-bg group-disabled:bg-neutral-800/2 text-tag-negative-content group-disabled:text-neutral-800/7;
  }
</style>
