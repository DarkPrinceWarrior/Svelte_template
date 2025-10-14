<script lang="ts">
  /** Импорты ***********************************************/

  import { Button } from "$lib/components";
  import ProgressBar from "$lib/components/ProgressBar.svelte";

  import { ArrowIcon } from "$lib/icons";
  import * as m from '$lib/i18n/messages';
</script>

<section
  aria-labelledby="input-fields"
  class="mx-auto my-[20vw] w-max flex flex-col justify-center"
>
  <header class="flex justify-between items-center gap-12">
    <div>
      <h1 class="animate-slide-up">{m.misc()}</h1>
    </div>

    <nav class="animate-slide-left animate-delay-75">
      <Button href="/" colorScheme="transparent" meta key="B">
        <div class="size-6 stroke-black">
          <ArrowIcon />
        </div>
      </Button>
    </nav>
  </header>

  <ProgressBar
    value={61}
    max={100}
    format={(v) => `${Math.floor(v).toString()}%`}
  />
</section>
