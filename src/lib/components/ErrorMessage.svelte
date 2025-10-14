<!--@component
  Сообщение об ошибке.
-->

<script module lang="ts">
  /** Импорты ***********************************************/

  import type { Snippet } from "svelte";

  /** Интерфейсы ********************************************/

  /** Свойства компонента `ErrorMessage` */
  export interface ErrorMessageProps {
    /** Содержание */
    children: Snippet;
  }
</script>

<script lang="ts">
  /** Свойства **********************************************/

  const { children } = $props();
</script>

<p class="text-red-500">{@render children()}</p>
