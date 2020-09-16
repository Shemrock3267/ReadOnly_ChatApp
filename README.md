# FakeChat

Fake Chat приложение.

## Что это за приложение?

Простенькое приложение, которое умеет получать список чатов с сервера и отображать их, а так же обращаться на сервер и отображать конкретный чат.

## Что оно НЕ может

Приложение НЕ отправляет запросы на сервер и соответственно НЕ изменяет данные на нём.

## Использованные технологии

1. HTML
2. Чистый CSS
3. Чистый JS
4. Postman (fake server)
5. Netlify (deployment)

## Способ подключения

Достаточно перейти по [ссылке](https://fakechat.netlify.app/)

Для авторизации используйте стандартные данные:

**login: admin**

**password: admin**

*Если вы используете Google Chrome актуальной версии, то у вас скорее всего активна функция Google Password Checkup Technology*

*Чтобы отключить её перейдите по этой [ссылке](https://support.google.com/accounts/thread/24564268?hl=en) и следуйте инструкциям в ответе на вопрос.*

## Работа с сервером

Данные на бэкенде разбиты на несколько эндпойнтов для снижения размера получаемого объекта и времени на отрисовку данных в окне чата.
Список эндпойнтов:
1. {{url}}/chats - список чатов
2. {{url}}/chats/c1 - чат №1
3. {{url}}/chats/c2 - чат №2
4. {{url}}/chats/c3 - чат №3
5. {{url}}/chats/c4 - чат №4
6. {{url}}/chats/c5 - чат №5

*{{url}} - сокращение полного url* 

### Как это выглядит
*Часть объекта, который мы получаем*

```{
 "chats": [
    {
      "id": 1,
      "partnerName": "Alex",
      "avatar": "https://api.adorable.io/avatars/10/alex",
      "lastMessage": "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
      "timestamp": 1593326489
    },...]}
```

## Работа с данными

### Как мы его получаем (список чатов)

Внутри класса Chats используем метод fetchChats() и  он обращается по созданному эндпойнту, в итоге удаленный сервер возвращает в качестве ответа на дефолтный метод GET объект с данными.

```
async fetchChats() {
  const response = await fetch( `${this.urlData}` );
  const responseData = await response.json();
  return responseData;
}
```

### Как мы его ~~рисуем~~рендерим

Для это мы написали класс ChatUI с методом paintChatList(), который принимает полученный объект и поэтапно рендерит список чатов.

### Получение и рендер выбранного чата

При клике на определенный чат, происходит запрос на сервер с уникальным id чата. Сервер возвращает объект с данными, которые в свою очередь сортируются с помощью метода sortDialog() в классе Dialog и рендерятся на странице.
```
sortMessages(data) {
    let tmp = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = data.length - 1; j >= i + 1; j--) {
        if (data[j].timestamp < data[j-1].timestamp) {
          tmp = data[j];
          data[j] = data[j - 1];
          data[j-1] = tmp;
        }
      }
    }

    return data;
  }
```

### Конвертация времени

Было использовано два способа:
1. [Intl.DateTimeFormat()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) *длинее*
2. [toLocaleString()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) *короче*

## Сторонние сервисы

1. Наш фейковый сервер [Postman](https://www.postman.com/) *disclaimer: 1000 бесплатных запросов в месяц*
2. Наш репозиторий [Bitbucket](https://bitbucket.org/) 
3. Наш хостинг [Netlify](https://www.netlify.com/)
4. Спасибо Даниэлю за [Trello](https://trello.com). Так мы распределяли задачи.
5. Смешные картинки [Adorable.io](https://adorable.io/)
6. Удобный сервис для конвертации времени [Timestampconvert](https://www.timestampconvert.com/)

## Наш Dream Team
Даниэль Лебедевич - UX UI 

Владислав Осипчук - Front 

Роман Олейник - Front ~~& Back~~ 
