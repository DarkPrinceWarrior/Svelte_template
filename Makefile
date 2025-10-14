# Настройки
DEV_COMPOSE_FILE = ./docker/compose.dev.yaml   # Compose файл для разработки
PROD_COMPOSE_FILE = ./docker/compose.prod.yaml # Compose файл для продакшена
DEV_DOCKERFILE = ./docker/Dockerfile.dev       # Dockerfile для разработки
PROD_DOCKERFILE = ./docker/Dockerfile.prod     # Dockerfile для продакшена

# Путь в реестре
REGISTRY_PATH = registry.ds-mind-lab.ru/developers

# Справка
.PHONY: help
help: ## Показать эту справку
	@echo "══════════════════════════════════════════"
	@echo " 📖  \033[1mСправка по Makefile\033[0m"
	@echo "══════════════════════════════════════════"
	@echo ""
	@echo "⚡ Использование: \033[32mmake [цель]\033[0m"
	@echo ""
	@echo "🎯 Доступные цели:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; \
			{printf "   ➤ \033[36m%-20s\033[0m — %s\n", $$1, $$2}'
	@echo ""
	@echo "══════════════════════════════════════════"

## Среда разработки
development-up: ## Запустить контейнеры для разработки
	docker compose -f $(DEV_COMPOSE_FILE) up -d

development-watch: ## Запустить контейнеры для разработки с синхронизацией файлов
	docker compose -f $(DEV_COMPOSE_FILE) watch

development-down: ## Остановить контейнеры разработки
	docker compose -f $(DEV_COMPOSE_FILE) down

development-build: ## Пересобрать контейнеры разработки
	docker compose -f $(DEV_COMPOSE_FILE) build

development-logs: ## Показать логи контейнеров разработки
	docker compose -f $(DEV_COMPOSE_FILE) logs -f

development-restart: development-down development-up ## Перезапустить контейнеры разработки

## Алиасы для dev
dev-up du: development-up
dev-watch dw: development-watch
dev-down dd: development-down
dev-build db: development-build
dev-logs dl: development-logs
dev-restart dr: development-restart

## Продакшен среда
production-up: ## Запустить продакшен контейнеры
	docker compose -f $(PROD_COMPOSE_FILE) up -d

production-down: ## Остановить продакшен контейнеры
	docker compose -f $(PROD_COMPOSE_FILE) down

production-build: ## Пересобрать продакшен контейнеры (без кэша)
	docker compose -f $(PROD_COMPOSE_FILE) build --no-cache

production-logs: ## Показать логи продакшен контейнеров
	docker compose -f $(PROD_COMPOSE_FILE) logs -f

production-restart: production-down production-up ## Перезапустить продакшен контейнеры

production-pull: ## Обновить образы для продакшена
	docker compose -f $(PROD_COMPOSE_FILE) pull

## Алиасы для prod
prod-up pu: production-up
prod-down pd: production-down
prod-build pb: production-build
prod-logs pl: production-logs
prod-restart pr: production-restart
prod-pull pp: production-pull

## Общие задачи
ps: ## Показать все контейнеры
	@echo "Контейнеры разработки:"
	@docker compose -f $(DEV_COMPOSE_FILE) ps
	@echo "\nПродакшен контейнеры:"
	@docker compose -f $(PROD_COMPOSE_FILE) ps

clean: development-down production-down ## Остановить все контейнеры
	@echo "Все контейнеры остановлены"

## Сборка образов
build-image: ## Собрать образ для продакшена
	docker build -f $(PROD_DOCKERFILE) -t $(REGISTRY_PATH):latest .

