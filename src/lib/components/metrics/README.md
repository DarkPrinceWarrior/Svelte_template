# Система метрик - Инструкция по формированию JSON разметки

Данный документ описывает структуру JSON разметки для создания карточек метрик на бэкенде и их отображения во фронтенде.

## Общая структура карточки метрики

Карточка метрики состоит из следующих основных компонентов:

- **Заголовок** - название карточки с иконкой
- **Цветовая схема** - определяет визуальное оформление
- **Разметка** - массив строк с компонентами метрик

## Структура JSON

### Основная структура карточки

```json
{
  "label": "Название карточки",
  "colorScheme": "neutral",
  "headerStyle": "inline",
  "layout": [
    {
      "display": "between",
      "items": [
        {
          "view": "big-number",
          "value": 1250,
          "suffix": "руб.",
          "trend": 15.5,
          "trendSuffix": "%",
          "desiredTrend": "rise",
          "label": "Доходы за месяц"
        }
      ]
    }
  ]
}
```

### Параметры карточки

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `label` | string | Да | Название карточки метрики |
| `colorScheme` | string | Нет | Цветовая схема: `neutral`, `neutral-dark`, `red`, `yellow`, `green` |
| `headerStyle` | string | Нет | Стиль заголовка: `inline` (по умолчанию), `topbar` |
| `layout` | array | Нет | Массив строк с компонентами метрик |

#### Цветовые схемы

Доступные цветовые схемы:

- `neutral` - нейтральная (по умолчанию)
- `neutral-dark` - темная нейтральная
- `red` - красная (для критических метрик)
- `yellow` - желтая (для предупреждающих метрик)
- `green` - зеленая (для положительных метрик)

#### Стили заголовков

- `inline` - заголовок встроен в основную область (по умолчанию)
- `topbar` - заголовок вынесен в отдельную верхнюю панель

#### Способы расположения элементов

- `between` - элементы распределены по краям с промежутком между ними (по умолчанию)
- `grid` - элементы расположены в сетке с равномерным распределением

### Параметры строки разметки (LayoutRow)

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `display` | string | Нет | Способ расположения: `between` (по умолчанию), `grid` |
| `items` | array | Да | Массив компонентов метрик |

## Типы компонентов метрик

### 1. Big Number (большое число)

Отображает основное числовое значение с трендом.

```json
{
  "view": "big-number",
  "value": 1250,
  "suffix": "руб.",
  "trend": 15.5,
  "trendSuffix": "%",
  "desiredTrend": "rise",
  "label": "Доходы за месяц"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"big-number"` |
| `value` | number | Да | Основное числовое значение |
| `suffix` | string | Да | Единица измерения (например: "руб.", "шт.", "чел.") |
| `trend` | number | Нет | Изменение значения (положительное/отрицательное) |
| `trendSuffix` | string | Нет | Единица измерения тренда (например: "%", "руб.", "шт.") |
| `desiredTrend` | string | Нет | Желаемое направление тренда |
| `label` | string | Нет | Подпись под значением |

#### Возможные значения для `desiredTrend`:
- `rise` - рост значения считается положительным
- `down` - снижение значения считается положительным

### 2. Indicator (индикатор)

Отображает статус или уровень критичности.

```json
{
  "view": "indicator",
  "theme": "green",
  "label": "Норма"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"indicator"` |
| `theme` | string | Да | Цветовая тема индикатора |
| `label` | string | Да | Текст статуса или описания |

#### Возможные значения для `theme`:
- `green` - нормальный уровень (зеленый индикатор)
- `yellow` - предупреждающий уровень (желтый индикатор)
- `red` - критический уровень (красный индикатор с анимацией пульсации)

### 3. Progress Circle (круг прогресса)

Отображает прогресс в виде круга с числовым значением.

```json
{
  "view": "progress-circle",
  "value": 75,
  "max": 100,
  "suffix": "%",
  "trend": 5,
  "trendSuffix": "%",
  "desiredTrend": "rise",
  "label": "Выполнение плана"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"progress-circle"` |
| `value` | number | Да | Текущее значение |
| `max` | number | Да | Максимальное значение для расчета прогресса |
| `suffix` | string | Да | Единица измерения (например: "%", "шт.", "чел.") |
| `trend` | number | Нет | Изменение значения (положительное/отрицательное) |
| `trendSuffix` | string | Нет | Единица измерения тренда (например: "%", "руб.", "шт.") |
| `desiredTrend` | string | Нет | Желаемое направление тренда |
| `label` | string | Нет | Подпись под значением |

#### Возможные значения для `desiredTrend`:
- `rise` - рост значения считается положительным
- `down` - снижение значения считается положительным

### 4. Medium Number (среднее число)

Отображает числовое значение среднего размера.

```json
{
  "view": "medium-number",
  "value": 42,
  "suffix": "шт.",
  "label": "Товары в наличии"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"medium-number"` |
| `value` | number | Да | Числовое значение |
| `suffix` | string | Да | Единица измерения (например: "шт.", "чел.", "дн.") |
| `label` | string | Нет | Подпись под значением |

### 5. Small Number (малое число)

Отображает числовое значение малого размера.

```json
{
  "view": "small-number",
  "value": 8,
  "suffix": "дн.",
  "label": "Дней до дедлайна"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"small-number"` |
| `value` | number | Да | Числовое значение |
| `suffix` | string | Да | Единица измерения (например: "дн.", "ч.", "мин.") |
| `label` | string | Нет | Подпись под значением |

### 6. Time Period (временной период)

Отображает временной интервал.

```json
{
  "view": "time-period",
  "value": 30,
  "suffix": "дн.",
  "label": "Период"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"time-period"` |
| `value` | number | Да | Значение временного периода |
| `suffix` | string | Да | Единица времени (например: "дн.", "ч.", "мин.", "сек.") |
| `label` | string | Нет | Подпись под значением |

### 7. Shares (доли)

Отображает процентные доли.

```json
{
  "view": "shares",
  "value": 65,
  "suffix": "%",
  "label": "Доля рынка"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"shares"` |
| `value` | number | Да | Значение доли |
| `suffix` | string | Да | Единица измерения (обычно "%") |
| `label` | string | Нет | Подпись под значением |

### 8. Bubbles (пузыри)

Отображает данные в виде пузырей.

```json
{
  "view": "bubbles",
  "value": 12,
  "label": "Активные проекты"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"bubbles"` |
| `value` | number | Да | Числовое значение |
| `label` | string | Нет | Подпись под значением |

### 9. HR (горизонтальная линия)

Разделитель между секциями.

```json
{
  "view": "hr"
}
```

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `view` | string | Да | Тип представления: `"hr"` |

## Примеры Python кода

### Базовый пример создания карточки

```python
import json

def create_metric_card(label, color_scheme="neutral", header_style="inline"):
    """Создает базовую структуру карточки метрики"""
    return {
        "label": label,
        "colorScheme": color_scheme,
        "headerStyle": header_style,
        "layout": []
    }

# Пример использования
card = create_metric_card("Финансовые показатели", "green")
print(json.dumps(card, ensure_ascii=False, indent=2))
```

### Создание компонента Big Number

```python
def create_big_number(value, suffix, trend=None, trend_suffix=None, 
                     desired_trend=None, label=None):
    """Создает компонент большого числа"""
    component = {
        "view": "big-number",
        "value": value,
        "suffix": suffix
    }

    if trend is not None:
        component["trend"] = trend
    if trend_suffix:
        component["trendSuffix"] = trend_suffix
    if desired_trend:
        component["desiredTrend"] = desired_trend
    if label:
        component["label"] = label

    return component

# Пример использования
big_number = create_big_number(
    value=1250,
    suffix="руб.",
    trend=15.5,
    trend_suffix="%",
    desired_trend="rise",
    label="Доходы за месяц"
)
print(json.dumps(big_number, ensure_ascii=False, indent=2))
```

### Создание компонента Indicator

```python
def create_indicator(theme, label):
    """Создает компонент индикатора"""
    return {
        "view": "indicator",
        "theme": theme,
        "label": label
    }

# Пример использования
indicator = create_indicator("green", "Норма")
print(json.dumps(indicator, ensure_ascii=False, indent=2))
```

### Создание компонента Progress Circle

```python
def create_progress_circle(value, max_value, suffix, trend=None, 
                          trend_suffix=None, desired_trend=None, label=None):
    """Создает компонент круга прогресса"""
    component = {
        "view": "progress-circle",
        "value": value,
        "max": max_value,
        "suffix": suffix
    }
    
    if trend is not None:
        component["trend"] = trend
    if trend_suffix:
        component["trendSuffix"] = trend_suffix
    if desired_trend:
        component["desiredTrend"] = desired_trend
    if label:
        component["label"] = label
        
    return component

# Пример использования
progress = create_progress_circle(
    value=75,
    max_value=100,
    suffix="%",
    trend=5,
    trend_suffix="%",
    desired_trend="rise",
    label="Выполнение плана"
)
print(json.dumps(progress, ensure_ascii=False, indent=2))
```

### Создание остальных компонентов

```python
def create_medium_number(value, suffix, label=None):
    """Создает компонент среднего числа"""
    component = {
        "view": "medium-number",
        "value": value,
        "suffix": suffix
    }
    if label:
        component["label"] = label
    return component

def create_small_number(value, suffix, label=None):
    """Создает компонент малого числа"""
    component = {
        "view": "small-number",
        "value": value,
        "suffix": suffix
    }
    if label:
        component["label"] = label
    return component

def create_time_period(value, suffix, label=None):
    """Создает компонент временного периода"""
    component = {
        "view": "time-period",
        "value": value,
        "suffix": suffix
    }
    if label:
        component["label"] = label
    return component

def create_shares(value, suffix, label=None):
    """Создает компонент долей"""
    component = {
        "view": "shares",
        "value": value,
        "suffix": suffix
    }
    if label:
        component["label"] = label
    return component

def create_bubbles(value, label=None):
    """Создает компонент пузырей"""
    component = {
        "view": "bubbles",
        "value": value
    }
    if label:
        component["label"] = label
    return component

def create_hr():
    """Создает компонент горизонтальной линии"""
    return {"view": "hr"}

# Примеры использования
medium_num = create_medium_number(42, "шт.", "Товары в наличии")
small_num = create_small_number(8, "дн.", "Дней до дедлайна")
time_period = create_time_period(30, "дн.", "Период")
shares = create_shares(65, "%", "Доля рынка")
bubbles = create_bubbles(12, "Активные проекты")
hr = create_hr()

print("Medium Number:", json.dumps(medium_num, ensure_ascii=False, indent=2))
print("Small Number:", json.dumps(small_num, ensure_ascii=False, indent=2))
print("Time Period:", json.dumps(time_period, ensure_ascii=False, indent=2))
print("Shares:", json.dumps(shares, ensure_ascii=False, indent=2))
print("Bubbles:", json.dumps(bubbles, ensure_ascii=False, indent=2))
print("HR:", json.dumps(hr, ensure_ascii=False, indent=2))
```

### Создание строки разметки

```python
def create_layout_row(items, display="between"):
    """Создает строку разметки с компонентами"""
    return {
        "display": display,
        "items": items
    }

# Пример использования
row = create_layout_row([
    create_big_number(1250, "руб.", 15.5, "%", "rise", "Доходы"),
    create_indicator("green", "Норма")
])
print(json.dumps(row, ensure_ascii=False, indent=2))
```

### Полный пример карточки

```python
def create_financial_metrics_card():
    """Создает полную карточку финансовых метрик"""
    card = create_metric_card("Финансовые показатели", "green")

    # Первая строка - основные показатели
    row1 = create_layout_row([
        create_big_number(1250000, "руб.", 15.5, "%", "rise", "Доходы за месяц"),
        create_big_number(850000, "руб.", -2.3, "%", "down", "Расходы за месяц")
    ])

    # Вторая строка - прогресс и статус
    row2 = create_layout_row([
        create_progress_circle(75, 100, "%", 5, "%", "rise", "Выполнение плана"),
        create_indicator("green", "Норма")
    ])

    # Третья строка - разделитель
    row3 = create_layout_row([{"view": "hr"}])

    # Четвертая строка - дополнительные показатели
    row4 = create_layout_row([
        create_medium_number(42, "шт.", "Товары в наличии"),
        create_small_number(8, "дн.", "Дней до дедлайна")
    ])

    card["layout"] = [row1, row2, row3, row4]
    return card

# Пример использования
financial_card = create_financial_metrics_card()
print(json.dumps(financial_card, ensure_ascii=False, indent=2))
```

### Создание карточки с сеткой

```python
def create_grid_metrics_card():
    """Создает карточку с сеткой компонентов"""
    card = create_metric_card("Статистика продаж", "blue")

    # Строка с сеткой из 4 компонентов
    grid_row = create_layout_row([
        create_small_number(150, "шт.", "Продано"),
        create_small_number(25, "шт.", "Возвраты"),
        create_small_number(85, "%", "Конверсия"),
        create_small_number(12, "дн.", "Средний цикл")
    ], display="grid")

    card["layout"] = [grid_row]
    return card

# Пример использования
grid_card = create_grid_metrics_card()
print(json.dumps(grid_card, ensure_ascii=False, indent=2))
```

### Валидация JSON структуры

```python
def validate_metric_card(card):
    """Проверяет корректность структуры карточки метрики"""
    required_fields = ["label"]
    for field in required_fields:
        if field not in card:
            return False, f"Отсутствует обязательное поле: {field}"

    if "layout" in card:
        for i, row in enumerate(card["layout"]):
            if "items" not in row:
                return False, f"Строка {i}: отсутствует поле 'items'"

            for j, item in enumerate(row["items"]):
                if "view" not in item:
                    return False, f"Строка {i}, элемент {j}: отсутствует поле 'view'"

    return True, "Структура корректна"

# Пример использования
card = create_financial_metrics_card()
is_valid, message = validate_metric_card(card)
print(f"Валидация: {message}")
```

### Утилиты для работы с данными

```python
def format_currency(value):
    """Форматирует валютные значения"""
    return f"{value:,.0f}"

def calculate_trend(current, previous):
    """Вычисляет тренд между текущим и предыдущим значением"""
    if previous == 0:
        return 0
    return ((current - previous) / previous) * 100

def get_indicator_theme(value, thresholds):
    """Определяет тему индикатора на основе значения и порогов"""
    if value >= thresholds["good"]:
        return "green"
    elif value >= thresholds["warning"]:
        return "yellow"
    else:
        return "red"

def get_color_scheme_by_value(value, thresholds):
    """Определяет цветовую схему карточки на основе значения"""
    if value >= thresholds["good"]:
        return "green"
    elif value >= thresholds["warning"]:
        return "yellow"
    else:
        return "red"

# Пример использования
current_revenue = 1250000
previous_revenue = 1080000
trend = calculate_trend(current_revenue, previous_revenue)

# Пороги для определения темы индикатора
thresholds = {
    "good": 1000000,    # Хороший уровень
    "warning": 500000   # Предупреждающий уровень
}

indicator_theme = get_indicator_theme(current_revenue, thresholds)
color_scheme = get_color_scheme_by_value(current_revenue, thresholds)

big_number = create_big_number(
    value=current_revenue,
    suffix="руб.",
    trend=trend,
    trend_suffix="%",
    desired_trend="rise",
    label="Доходы за месяц"
)

indicator = create_indicator(indicator_theme, "Статус")

print("Big Number:", json.dumps(big_number, ensure_ascii=False, indent=2))
print("Indicator:", json.dumps(indicator, ensure_ascii=False, indent=2))
print(f"Color Scheme: {color_scheme}")
```
