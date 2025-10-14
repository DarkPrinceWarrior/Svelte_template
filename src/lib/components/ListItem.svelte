<!--@component
  Стандартный компонент элемента списка.
-->

<script module lang="ts">
</script>

<script lang="ts">
  /** Импорты ***********************************************/

  import type { Component, Snippet } from "svelte";

  import { Button } from "$lib/components";

  /** Типы **************************************************/

  /** Функция обратного вызова при нажатии на кнопку действия. */
  export type ListItemActionCallback<T> = (item: T) => void;

  /** Интерфейсы ********************************************/

  /** Действие. */
  export interface ListItemAction<T> {
    /** Иконка. */
    icon: Component;
    /** Функция обратного вызова. */
    callback: ListItemActionCallback<T>;
  }

  /** Свойства компонента `ListItem`. */
  export interface ListItemProps<T> {
    /** Действия. */
    actions?: ListItemAction<T>[];
    /** Содержимое. */
    children: Snippet<[any]>;
    /** Элемент для отображения. */
    item: T;
  }

  /** Свойства **********************************************/

  const { actions, children, item }: ListItemProps<any> = $props();
</script>

<div class="px-2 py-1 border flex gap-4 justify-between items-center">
  {@render children({ ...item })}

  {#if actions && actions.length > 0}
    <ul class="flex gap-2">
      {#each actions as { icon: Icon, callback }, index (index)}
        <li>
          <Button colorScheme="transparent" onclick={() => callback(item)}>
            <div class="size-4 stroke-1 stroke-black fill-black">
              <Icon />
            </div>
          </Button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
