<script lang="ts">
  /** Импорты ***********************************************/

  import {
    TextInput,
    DropdownSelector,
    Selector,
    DateInput,
    FileInput,
    PasswordStrengthIndicator,
    Button
  } from "$lib/components";
  import { ArrowIcon } from "$lib/icons";
  import * as m from '$lib/i18n/messages';

  /** Состояния *********************************************/

  let textValue = $state("");
  let dateValue: Date | null = $state(null);
</script>

<section
  aria-labelledby="input-fields"
  class="mx-auto my-[20vw] w-max flex flex-col justify-center"
>
  <header class="flex justify-between items-center gap-12">
    <div>
      <h1 class="animate-slide-up">{m.input_fields()}</h1>
    </div>

    <nav class="animate-slide-left animate-delay-75">
      <Button href="/" colorScheme="transparent" meta key="B">
        <div class="size-6 stroke-black">
          <ArrowIcon />
        </div>
      </Button>
    </nav>
  </header>

  <ul class="mt-4 flex flex-col gap-4 animate-fade-in animate-delay-75">
    <li>
      <TextInput
        label={m.text()}
        placeholder={m.enter_text()}
        maxlength={20}
        bind:value={textValue}
      />
    </li>

    <li>
      <TextInput
        label={m.secret()}
        placeholder={m.enter_secret()}
        maxlength={20}
        secure
        bind:value={textValue}
      />

      <PasswordStrengthIndicator bind:value={textValue} />
    </li>

    <li>
      <DateInput
        label={m.date()}
        placeholder={m.select_date()}
        bind:value={dateValue}
      />
    </li>

    <li>
      <FileInput label={m.file()} accept=".png, .jpeg" />
    </li>

    <li>
      <DropdownSelector
        label={m.selector()}
        options={[
          { label: m.truth(), value: "truth" },
          { label: m.strength(), value: "lie" }
        ]}
      />
    </li>

    <li>
      <Selector
        label={m.selector()}
        options={[
          { label: m.truth(), value: "truth" },
          { label: m.strength(), value: "lie" }
        ]}
      />
    </li>
  </ul>
</section>
