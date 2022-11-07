[![Tests](https://github.com/dubyninpavel/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/dubyninpavel/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект: Mesto (backend)
Backend часть приложения по размещению фотографий.

## Что такое проект Mesto:
Проект предназначен для ознакомления и изучения новых мест нашей планеты. Разработана бэкенд-часть с использованием Node.js. Проект реализован на серверах Yandex-cloud.

## Используемые технологии
1. Node.js.
2. Express.
3. MongoDB.

## Директории
* `/config` — папка с файлами конфигурации.
* `/controllers` — папка с файлами контроллеров пользователя и карточки.
* `/middlewares` — папка с мидлвэйрами.
* `/models` — папка с файлами описания схем пользователя и карточки. 
* `/routes` — папка с файлами роутера.
* `/validator` — папка с файлами валидации приходящих запросов.
* Остальные директории вспомогательные, создаются при необходимости разработчиком.

## Ссылка на Github:
* [Проект: Mesto](https://github.com/dubyninpavel/express-mesto-gha)

## Ссылка на запрос:
Запрос к серверу:
* [Проект: Mesto](https://api.project.mesto.russia.nomoredomains.icu)
* IP: 178.154.220.64

## Запуск проекта
* Установить зависимости:
`npm i`
* Запустить сервер:
`npm run start`
* Запустить сервер с hot-reload
`npm run dev`
* Запустить сервер с hot-reload и базой MongoDB:
`npm run both`
* Запросы к серверу можно отправить через POSTMAN. По адресу:
https://api.project.mesto.russia.nomoredomains.icu
