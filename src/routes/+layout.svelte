<script lang="ts">
  import type { LayoutProps } from "./$types";

  import { onMount } from "svelte";

  import { setLocale } from "$lib/i18n/runtime";

  import "$lib/styles/global.css";

  import favicon from "$lib/assets/favicon.svg";

  let { children }: LayoutProps = $props();

  onMount(() => {
    // :3
    window.vibeOn = () => setLocale("vibey");
    window.vibeOff = () => setLocale("ru");
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
