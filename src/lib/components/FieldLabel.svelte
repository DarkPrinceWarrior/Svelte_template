<script lang="ts">
  /** Интерфейсы ********************************************/

  /** Свойства компонента `FieldLabel` */
  interface FieldLabelProps {
    /** Идентефикатор поля */
    id: string;
    /** Лейбл */
    label: string;
    /** Флаг, указывающий что пользователь сфокусирован на поле */
    focused: boolean;
    /** Флаг, указывающий что поле пустое */
    empty: boolean;
    /** Сообщение об ошибке */
    error?: string | null;
  }

  /** Свойства **********************************************/

  const {
    id,
    label = $bindable(),
    focused = $bindable(),
    empty = $bindable(),
    error = $bindable()
  }: FieldLabelProps = $props();
</script>

<div class="w-full h-3 absolute -top-[1.5px] flex">
  <line
    class="border-l-2 border-t-2 rounded-tl-md w-2 h-2 -translate-x-[1.5px] transition-colors duration-150"
    class:border-red-700={error}
    class:border-primary-500={focused}
    class:border-neutral-500={!empty}
  />

  <label
    for={id}
    class="px-1 w-max -translate-y-2/3 text-xs transition-colors duration-150"
    class:text-red-700={error}
    class:text-primary-500={focused}
    class:text-neutral-500={!empty}
  >
    {label.replace(" ", "\xA0")}
  </label>

  <line
    class="border-r-2 border-t-2 rounded-tr-md w-full h-2 translate-x-[1.5px] transition-colors duration-150"
    class:border-red-700={error}
    class:border-primary-500={focused}
    class:border-neutral-500={!empty}
  />
</div>
