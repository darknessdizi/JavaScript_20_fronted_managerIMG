# Домашнее задание к занятию "7. Работа с HTTP"

## Fronted

[![Build status](https://ci.appveyor.com/api/projects/status/670f9cdka6n6podq?svg=true)](https://ci.appveyor.com/project/darknessdizi/javascript-20-fronted-managerimg)

Ссылка на страницу: https://darknessdizi.github.io/JavaScript_20_fronted_managerIMG/

---

## Backend

Ссылка на git-hub репозиторий (backend): https://github.com/darknessdizi/JavaScript_20_server_backend_managerIMG.git

---

Правила сдачи задания:

1. **Важно**: в рамках этого ДЗ нужно использовать npm (а значит, никакого `yarn.lock` в репозитории быть не должно)
2. Frontend должен собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor
3. В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
4. В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
5. Авто-тесты писать не требуется

### Image Manager (задача со звёздочкой)

Важно: данная задача не является обязательной

#### Легенда

Настало время докрутить менеджер картинок, который вы делали на протяжении нескольких лекций. Теперь нужно, чтобы все картинки загружались и хранились на сервере. А при удалении удалялись с сервера.

#### Описание

Напишите серверную часть с использованием 'koa' (по аналогии с тем, как это было на лекции), но докрутите туда:
1. Хранение списка картинок - предложите, как отдавать его на клиент (возможно, JSON?)
1. Удаление картинок с сервера (при нажатии на кнопку удалить с клиента)

<details>
<summary>Подсказка</summary>
    
Делайте удаление методом POST: /?method=removeImage&id=`<id>`
</details>

Напоминаем, как он должен выглядеть:

![](./pic/image.png)

Обратите внимание на несколько важных моментов:
1. Ваш менеджер картинок должен по-прежнему поддерживать drag and drop и загрузку по клику
2. Не загружайте больших картинок (более 1Мб): на всех серверах установлены ограничения, мы для упрощения этот момент опускаем

Вам придётся провести исследовательскую работу и выяснить, как удалять файлы с помощью API NodeJS. Надеемся, что вы справитесь с этим, но дадим небольшую подсказку: https://nodejs.org/api/fs.html

Вы можете реализовать развёртывание в удобном для вас формате: либо так, как это было описано на лекции (отдельно для frontend + GitHub Pages и backend), либо собрать frontend и настроить backend так, чтобы он обрабатывал frontend так же, как картинки (см. koa-static с лекции).

Используйте `FormData` для отправки данных. Авто-тесты к данной задаче не нужны.

В качестве результата пришлите проверяющему ссылку на GitHub репозиторий.
