# MyAniBook API

REST API для социальной платформы, связанной с аниме. Позволяет регистрировать пользователей, управлять профилями, аниме-листами и постами.

## Демо

```
https://myanibook-api.onrender.com/api/docs
```

## Стек технологий

- **NestJS** — фреймворк
- **PostgreSQL** — база данных
- **Sequelize** — ORM
- **JWT** — аутентификация
- **Swagger** — документация API
- **Docker** — контейнеризация

## Установка и запуск

#### Локально

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run start:dev

# Собрать и запустить продакшн
npm run build
npm run start:prod
```

#### Через Docker

```bash
docker-compose up --build
```

#### База данных

Для подключения БД к проекту создай файл `.env` в корне проекта (пример в `.env.example`) 

#### Документация API

Swagger доступен по адресу после запуска:

```
http://localhost:5000/api/docs
```

