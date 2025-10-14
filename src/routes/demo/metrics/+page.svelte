<script lang="ts">
  import {
    BigNumber,
    Bubbles,
    Indicator,
    MediumNumber,
    ProgressCircle,
    Shares,
    SmallNumber,
    TimePeriod
  } from "$lib/components/metrics/views";

  import { Button, MetricCard } from "$lib/components";
  import { ArrowIcon, DribbleIcon } from "$lib/icons";

  import * as m from "$lib/i18n/messages";
</script>

<section
  aria-labelledby="input-fields"
  class="mx-auto my-[20vw] w-3/4 flex flex-col justify-center"
>
  <header class="flex justify-between items-center gap-12">
    <div>
      <h1 class="animate-slide-up">{m.metric_cards()}</h1>
    </div>

    <nav class="animate-slide-left animate-delay-75">
      <Button href="/" colorScheme="transparent" meta key="B">
        <div class="size-6 stroke-black">
          <ArrowIcon />
        </div>
      </Button>
    </nav>
  </header>

  <div class="grid grid-cols-2 gap-2">
    <p>
      {m.backend_approach()}
    </p>

    <p>
      {m.frontend_approach()}
    </p>

    <MetricCard
      icon={DribbleIcon}
      label={m.json_approach()}
      layout={[
        {
          items: [
            {
              view: "big-number",
              trend: 34,
              trendSuffix: " elo",
              desiredTrend: "rise",
              value: 1430,
              suffix: " elo",
              label: m.big_number()
            },
            {
              view: "bubbles",
              label: m.bubbles(),
              bubbles: [
                {
                  value: 1,
                  suffix: "n"
                },
                {
                  colorScheme: "green",
                  value: 11,
                  suffix: "g"
                },
                {
                  colorScheme: "yellow",
                  value: 111,
                  suffix: "y"
                },
                {
                  colorScheme: "red",
                  value: 111111,
                  suffix: "r"
                }
              ]
            }
          ]
        },
        {
          display: "grid",
          items: [
            {
              view: "indicator",
              theme: "green",
              label: m.good()
            },
            {
              view: "indicator",
              theme: "yellow",
              label: m.normal()
            },
            {
              view: "indicator",
              theme: "red",
              label: m.bad()
            }
          ]
        },
        {
          items: [{ view: "hr" }]
        },
        {
          display: "grid",
          items: [
            {
              view: "progress-circle",
              trend: 34,
              trendSuffix: " elo",
              desiredTrend: "rise",
              max: 1500,
              value: 1430,
              suffix: " elo",
              label: m.big_number()
            },
            {
              view: "medium-number",
              value: 55,
              suffix: "%",
              label: m.flash_success()
            }
          ]
        },
        {
          items: [
            {
              view: "shares",
              shares: [
                {
                  value: 10,
                  suffix: "%",
                  label: m.done()
                },
                {
                  value: 20,
                  suffix: "%",
                  label: m.in_progress()
                },
                {
                  value: 70,
                  suffix: "%",
                  label: m.not_started()
                }
              ]
            }
          ]
        },
        {
          display: "grid",
          items: [
            {
              view: "small-number",
              value: 1430,
              suffix: " elo",
              label: m.small_number()
            },
            {
              view: "small-number",
              value: 1430,
              suffix: " elo",
              label: m.small_number()
            },
            {
              view: "small-number",
              value: 1430,
              suffix: " elo",
              label: m.small_number()
            }
          ]
        },
        {
          items: [
            {
              view: "time-period",
              start: new Date(),
              end: new Date()
            }
          ]
        }
      ]}
    />

    <MetricCard icon={DribbleIcon} label={m.html_approach()}>
      <div class="flex justify-between items-end">
        <BigNumber
          trend={34}
          trendSuffix=" elo"
          desiredTrend="rise"
          value={1430}
          suffix=" elo"
          label={m.big_number()}
        />

        <Bubbles
          label={m.bubbles()}
          bubbles={[
            {
              value: 1,
              suffix: "n"
            },
            {
              colorScheme: "green",
              value: 11,
              suffix: "g"
            },
            {
              colorScheme: "yellow",
              value: 111,
              suffix: "y"
            },
            {
              colorScheme: "red",
              value: 111111,
              suffix: "r"
            }
          ]}
        />
      </div>

      <div class="grid grid-cols-3 items-end">
        <Indicator theme="green" label={m.good()} />
        <Indicator theme="yellow" label={m.normal()} />
        <Indicator theme="red" label={m.bad()} />
      </div>

      <p class="text-neutral-400 text-center">{m.sudden_deb()}</p>

      <!-- Стили для горизонтальной линии применяются автоматически -->
      <hr />

      <div class="grid grid-cols-2 items-end">
        <ProgressCircle
          trend={34}
          trendSuffix="elo"
          desiredTrend="rise"
          max={1500}
          value={1430}
          suffix="elo"
          label={m.big_number()}
        />

        <MediumNumber value={55} suffix="%" label={m.flash_success()} />
      </div>

      <div class="flex justify-between">
        <Shares
          shares={[
            {
              value: 10,
              suffix: "%",
              label: m.done()
            },
            {
              value: 20,
              suffix: "%",
              label: m.in_progress()
            },
            {
              value: 70,
              suffix: "%",
              label: m.not_started()
            }
          ]}
        />
      </div>

      <div class="grid grid-cols-3">
        <SmallNumber value={1430} suffix=" elo" label={m.small_number()} />

        <SmallNumber value={1430} suffix=" elo" label={m.small_number()} />

        <SmallNumber value={1430} suffix=" elo" label={m.small_number()} />
      </div>

      <div class="flex justify-between">
        <TimePeriod start={new Date()} end={new Date()} />
      </div>

      <div class="flex justify-end">
        <Button
          onclick={() => {
            alert(m.now_yes());
          }}
        >
          {m.was_this_possible()}
        </Button>
      </div>
    </MetricCard>
  </div>
</section>
