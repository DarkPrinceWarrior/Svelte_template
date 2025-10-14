<!--@component
  Список элементов.
-->

<script lang="ts">
  /** Импорты ***********************************************/

  import { type Component, type Snippet } from "svelte";

  import { ListItem } from "$lib/components";

  /** Интерфейсы ********************************************/

  /** Параметры конструктора `MissingKeyPropertyError`. */
  interface MissingKeyPropertyErrorParams {
    /** Имя ключевого свойства. */
    key: string;
    /** Объект, у которого отсутсвует ключевое свойство. */
    object: object;
  }

  /** Свойства компонента `List`. */
  export interface ListProps {
    /** Компонент, используемый для отображения элемента списка. */
    itemComponent?: Component<any>;
    /**
     * Массив элементов списка.
     *
     * При отображении элемент развёртывается и передаёться в `itemComponent`.
     */
    items: object[];
    /**
     * Имя ключевого свойства.
     *
     * Ключевое свойство используется в качетсве ключевого выражения
     * для элемента при отрисовки в цилке.
     */
    key: string;
    /** Сниппет местозаместитель. Отображается при отсутсвии элементов. */
    placeholder?: Snippet;
  }

  /** Классы ************************************************/

  /** Ошибка, возникающая при отсутсвии ключевого свойства у элемента списка. */
  export class MissingKeyPropertyError extends Error {
    constructor({ key, object }: MissingKeyPropertyErrorParams) {
      super(
        `Ключевое свойство ${key} в объекте ${JSON.stringify(object)} отсутсвует.`
      );
      this.name = "MissingKeyPropertyError";
    }
  }

  /** Свойства **********************************************/

  let {
    itemComponent: Item = $bindable(ListItem),
    items = $bindable(),
    key,
    placeholder
  }: ListProps = $props();

  /** Константы *********************************************/

  const ANIMATION_DELAY = 75;

  /** События ***********************************************/

  validateItems();

  /** Функции ***********************************************/

  /**
   * Проверяет существование ключевого свойства у элементов списка.
   *
   * @throws Если у какого-либо элемента отсутствует ключевое свойство.
   */
  function validateItems() {
    for (const item of items) {
      if (Object.hasOwn(item, key)) continue;

      throw new MissingKeyPropertyError({ key, object: item });
    }
  }
</script>

{#if items}
  <ul class="flex flex-col gap-2">
    {#each items as item, index ((item as any)[key])}
      <li
        class="animate-slide-up fill-mode-backwards"
        style="animation-delay: {ANIMATION_DELAY * index}ms;"
      >
        <Item {...item} />
      </li>
    {/each}
  </ul>
{:else}
  {@render placeholder?.()}
{/if}
