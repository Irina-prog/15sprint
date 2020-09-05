## Проектная работа 15: Подготовка и деплой проекта Mesto.

Содержит backend, необходимый для работы созданного раннее frontend.

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Irina-prog/15sprint)
![GitHub open issues](https://img.shields.io/github/issues-raw/Irina-prog/15sprint)
![GitHub stars](https://img.shields.io/github/stars/Irina-prog/15sprint?style=social)



Используемые технологии: npm, express, mongoose, mongo db, jwt, helmet, winston, joi, celebrate.


### Установка

Убедитесь, что Mongo DB установлен и запущен на локальном компьютере.
Выполните после извлечения из git следующую команду `npm install`

Установите следующие переменные окружения (можете сделать это в файле .env):

`JWT_SECRET` - секрет для создания и проверки токена JWT (случайный набор символов и букв),

`DATABASE_URL` - url для БД (по умолчанию: mongodb://localhost/mestodb),

`PORT` - порт который будет слушать приложение (по умолчанию: 3000) 

Для запуска сервера  выполните `npm start`.
Для запуска сервера с поддержкой hot reload выполните `npm run dev`.

### Развертывание на сервере

Установите на сервере mongodb или используйте настроенный раннее сервер mongod. 

Подключитесь к удалённой машине, установите на ней node js и выполните в терминале:

```sh
git clone https://github.com/Irina-prog/15sprint

cd 15sprint

npm install
```

Создайте в этом каталоге файл `.env` со следующим содержимым

```
NODE_ENV=production
JWT_SECRET=<случайный набор символов>
DATABASE_URL=<url на установленный экземпляр mongodb>
PORT=<порт который будет слушать приложение>
```

Установите `pm2` командой `sudo npm install pm2 -g` и запустите приложение командой `pm2 start app.js`
Для того, чтобы `pm2` запускал приложение после перезагрузки выполните
```sh
pm2 startup

# Затем выполните команду, которую покажет вывод  pm2 startup

pm2 save
```

При необходимости настройте reverse proxy, https, firewall.


### Для ревьювера

Вы можете потестировать приложение на `mestopesto.ml` (ip 84.201.133.71)

Доступ к API возможен по путям:

1. `http://84.201.133.71:3000`
1. `http://mestopesto.ml:3000`
1. `https://mestopesto.ml`

Запрос на `http://mestopesto.ml` будет перенаправлен на `https://mestopesto.ml` сервером nginx

Публикуйте ваши замечания [здесь](https://github.com/Irina-prog/15sprint/issues).



