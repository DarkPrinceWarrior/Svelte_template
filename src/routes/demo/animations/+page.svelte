<script>
  import { Button } from "$lib/components";
  import { ArrowIcon } from "$lib/icons";
  import * as m from '$lib/i18n/messages';
</script>

<section
  aria-labelledby="animations"
  class="mx-auto w-max h-screen flex flex-col justify-center"
>
  <header class="flex justify-between items-center gap-12">
    <div>
      <h1 class="animate-slide-up">{m.animations()}</h1>

      <p class="animate-slide-up animate-delay-75">
        {m.animations_hover_note()}
      </p>
    </div>

    <nav class="animate-slide-left animate-delay-75">
      <Button href="/" colorScheme="transparent" meta key="B">
        <div class="size-6 stroke-black">
          <ArrowIcon />
        </div>
      </Button>
    </nav>
  </header>

  <ul class="mt-8 grid grid-cols-3 gap-4 animate-fade-in animate-delay-150">
    <li class="hover:animate-fade-in">
      <p>{m.animate_fade_in()}</p>
    </li>

    <li class="hover:animate-slide-up">
      <p>{m.animate_slide_up()}</p>
    </li>

    <li class="opacity-0"></li>

    <li class="hover:animate-slide-left">
      <p>{m.animate_slide_left()}</p>
    </li>

    <li class="hover:animate-slide-down">
      <p>{m.animate_slide_down()}</p>
    </li>

    <li class="hover:animate-slide-right">
      <p>{m.animate_slide_right()}</p>
    </li>
  </ul>
</section>

<style>
  @reference '$lib/styles/global.css';

  li {
    @apply rounded-lg p-2 bg-primary-500 shadow-primary-800/25 shadow-lg will-change-auto;

    p {
      @apply text-white text-center;
    }
  }
</style>
