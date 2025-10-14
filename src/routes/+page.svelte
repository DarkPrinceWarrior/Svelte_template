<script>
  import * as m from '$lib/i18n/messages';
  
  const DEMO_PAGES = [
    { href: "/demo/animations", label: m.animations() },
    { href: "/demo/fields", label: m.input_fields() },
    { href: "/demo/buttons", label: m.buttons() },
    { href: "/demo/misc", label: m.misc() },
    { href: "/demo/metrics", label: m.metrics() }
  ];
</script>

<section
  aria-labelledby="hero"
  class="mx-auto w-max h-screen flex flex-col justify-center"
>
  <header>
    <h1 class="animate-slide-up">
      {m.svelte_template_title()}
    </h1>
  </header>

  <nav class="mt-4">
    <header>
      <h2 class="animate-slide-up animate-delay-75">
        {m.demo_pages_title()}
      </h2>
    </header>

    <ul class="mt-4 ml-6 list-disc">
      {#each DEMO_PAGES as { href, label }, index (href)}
        <li
          class="animate-slide-up"
          style="animation-delay: {150 + index * 75}ms;"
        >
          <a {href} class="dynamic-underline">{label}</a>
        </li>
      {/each}
    </ul>
  </nav>
</section>
