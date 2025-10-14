<script lang="ts">
  /** Импорты ***********************************************/

  import { Button } from "$lib/components";
  import {
    ArrowIcon,
    DribbleIcon,
    SearchIcon,
    PlusIcon,
    HeartIcon,
    StarIcon
  } from "$lib/icons";
  import * as m from "$lib/i18n/messages";

  /** Константы *********************************************/

  const sizes = ["small", "medium", "large"];
  const rounding = ["2xl", "full"];
  const colorSchemes = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "negative",
    "transparent"
  ];
  const iconPosition = ["left", "right"];
  const disabled = [false, true];

  const buttons = sizes.flatMap((size) =>
    rounding.flatMap((rounding) =>
      disabled.flatMap((disabled) =>
        iconPosition.flatMap((iconPosition) =>
          colorSchemes.map((colorScheme) => ({
            size,
            disabled,
            rounding,
            colorScheme,
            iconPosition,
            key: "A",
            ctrl: true,
            alt: true,
            shift: true,
            meta: true
          }))
        )
      )
    )
  );
</script>

<section
  aria-labelledby="input-fields"
  class="mx-auto w-1/2 h-screen flex flex-col justify-center"
>
  <header class="flex justify-between items-center gap-12">
    <div>
      <h1 class="animate-slide-up">{m.buttons()}</h1>
    </div>

    <nav class="animate-slide-left animate-delay-75">
      <Button href="/" colorScheme="transparent" meta key="B">
        <div class="size-6 stroke-black">
          <ArrowIcon />
        </div>
      </Button>
    </nav>
  </header>

  <div class="p-6 bg-neutral-100 rounded-2xl">
    <h2 class="typo-h5! mb-4">Примеры stroke переопределения для иконок</h2>
    <div class="flex flex-wrap gap-4">
      <Button icon={SearchIcon} colorScheme="primary">Поиск</Button>
      <Button icon={PlusIcon} colorScheme="secondary">Добавить</Button>
      <Button icon={HeartIcon} colorScheme="tertiary">Лайк</Button>
      <Button icon={StarIcon} colorScheme="neutral">Избранное</Button>
      <Button icon={DribbleIcon} colorScheme="negative">Удалить</Button>
      <Button icon={ArrowIcon} colorScheme="transparent">Назад</Button>
    </div>
  </div>

  <div class="w-full h-full overflow-auto">
    <ul
      class="mt-8 size-max grid grid-cols-6 gap-2 animate-fade-in animate-delay-150 overflow-auto"
    >
      {#each buttons as buttonProps, index (index)}
        <li class="size-full flex justify-center items-center">
          <Button icon={DribbleIcon} {...buttonProps}>{m.button()}</Button>
        </li>
      {/each}
    </ul>
  </div>
</section>
