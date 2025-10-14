# svelte шаблон

## Стэк

- Менеджер пакетов [`npm` v11](https://docs.npmjs.com)
- JS движок [`NodeJS` v24](https://nodejs.org/docs/latest/api/)

- Фреймворк [`SvelteKit` v5](https://svelte.dev/docs/kit/introduction)
- Библиотека стилей [`Tailwind` v4](https://tailwindcss.com/docs/installation/using-vite)

## Разработка

```sh
# 001. Сделайте копию шаблонного файла с переменными окружения
cp env.example .env

# 002. Запустите сервисы через compose
make dev-watch
```

## Сборка

```sh
make build
```
