<!--@component
  Выборщик
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import { Button } from "$lib/components";

  import { CheckmarkIcon } from "$lib/icons";

  /** Интерфейсы ********************************************/

  /** Опция. */
  interface SelectorOption {
    /** Лейбл, отображающийся в спике опций. */
    label: string;
    /** Объект, соответсвующий опции. */
    value: any;
  }

  /** Свойства компонента `Selector`. */
  interface SelectorProps {
    /** Список возможных опций. */
    options: SelectorOption[];
    /** Объект, соответствующий выбранной опции. */
    value: any | null;
  }

  /** Интерфейсы ********************************************/

  let { options, value = $bindable(null) }: SelectorProps = $props();
</script>

<ul class="flex gap-2">
  {#each options as { label, value: v } (label)}
    <li class="w-full">
      <Button
        size="medium"
        width="full"
        rounding="lg"
        colorScheme={value === v ? "secondary" : "neutral"}
        icon={value === v ? CheckmarkIcon : undefined}
        onclick={() => (value = v)}>{label}</Button
      >
    </li>
  {/each}
</ul>
