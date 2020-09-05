## Проектная работа 14: Аутентификация и авторизация в проекте Mesto.

Содержит backend, необходимый для работы созданного раннее frontend.

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Irina-prog/14sprint)
![GitHub open issues](https://img.shields.io/github/issues-raw/Irina-prog/14sprint)
![GitHub stars](https://img.shields.io/github/stars/Irina-prog/14sprint?style=social)



Используемые технологии: npm, express, mongoose, mongo db, jwt, helmet.


### Установка

Убедитесь, что Mongo DB установлен и запущен на локальном компьютере.
Выполните после извлечения из git следующую команду `npm install`

Установите следующие переменные окружения (можете сделать это в файле .env):

`JWT_SECRET` - секрет для создания и проверки токена JWT (случайный набор символов и букв),

`DATABASE_URL` - url для БД (по умолчанию: mongodb://localhost/mestodb),

`PORT` - порт который будет слушать приложение (по умолчанию: 3000) 

Для запуска сервера  выполните `npm start`.
Для запуска сервера с поддержкой hot reload выполните `npm run dev`.

Публикуйте ваши замечания [здесь](https://github.com/Irina-prog/14sprint/issues).


