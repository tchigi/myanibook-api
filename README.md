# MyAniBook API

REST API бэкенд — часть фулстак приложения **MyAniBook**. Пользователи могут регистрироваться, управлять своим профилем и аватаром, вести личный аниме-лист со статусами просмотра.

Приложение построено на **NestJS** с использованием **PostgreSQL** и **Sequelize ORM**. Аутентификация реализована через **JWT** с ролевой системой доступа. API полностью задокументировано через **Swagger** и разворачивается через **Docker**.

## Демо

[https://myanibook-api.onrender.com/api/docs](https://myanibook-api.onrender.com/api/docs)

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


