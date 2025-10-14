# Иконки (Icons)

Библиотека SVG иконок для Svelte компонентов.

## Технические требования

### Структура файла
Каждая иконка должна быть создана как отдельный `.svelte` файл с минимальной структурой:

```svelte
<svg viewBox="0 0 24 24">
  <path d="..." stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### Обязательные атрибуты

#### SVG элемент
- **viewBox**: Стандартный `"0 0 24 24"` для всех иконок (кроме специальных случаев)
- **НЕ ДОЛЖНО быть**: `width`, `height`, `xmlns`, `fill`, `stroke` атрибутов

#### Path элементы
- **stroke-width**: `"2"` для всех stroke иконок
- **stroke-linecap**: `"round"` для всех stroke иконок  
- **stroke-linejoin**: `"round"` для всех stroke иконок
- **stroke**: `"none"` для fill иконок (чтобы избежать двойной обводки)

### Типы иконок

#### Stroke иконки (рекомендуемые)
Используют `stroke` для отрисовки контуров:
```svelte
<svg viewBox="0 0 24 24">
  <path d="M12 5V19M5 12H19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

#### Fill иконки
Используют `fill` для заливки, но должны иметь `stroke="none"`:
```svelte
<svg viewBox="0 0 24 24">
  <path d="M12 2C10.0222 2..." stroke="none"/>
</svg>
```

### Стилизация

Иконки автоматически получают цвета через CSS переменные в компонентах:

### Создание новых иконок

1. **Создайте файл** `IconName.svelte` в папке `src/lib/icons/`
2. **Следуйте структуре** согласно техническим требованиям
3. **Добавьте экспорт** в `index.js`:
   ```javascript
   export { default as IconName } from './IconName.svelte';
   ```
``