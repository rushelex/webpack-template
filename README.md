<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack Template</h1>
  <p>
    Webpack – это сборщик проектов. Его основная цель – собирать файлы JavaScript для использования в браузере, но он также способен преобразовывать, собирать или упаковывать практически любые ресурсы.
  </p>
  <p>Разработано: Алексей Шелементьев | <a href="https://github.com/rushelex">rushelex</a></p>
</div>

## Установка:

``` bash
# Клонировать репозиторий:
git clone https://github.com/rushelex/webpack-template webpack-template

# Перейти в папку с проектом:
cd webpack-template

# Установить зависимости:
npm install

# Запуск dev-сервера с перезагрузкой по адресу http://localhost:8081/
npm run dev

# Компиляция проекта в папку /dist
npm run build
```

## Структура проекта:

* `src/assets/fonts` — шрифты
* `src/assets/img` — изображения. Не забудьте использовать корректный путь: `/assets/img/some.jpg`
* `src/assets/includes/js` — javascript-файлы. Не забудьте импортировать их в `main.js`
* `src/assets/includes/pug` — pug-файлы блоков и элементов
* `src/assets/includes/styl` — stylus-файлы страниц, блоков и элементов. Не забудьте импортировать их в `main.styl`
* `src/assets/includes/css` — то же, что и выше, но CSS-файлы. Не забудьте импортировать их в  `index.js`
* `src/assets/includes/utils` — миксины и пр.
* `src/assets/includes/mothership.pug` — основной шаблон страницы
* `src/assets/includes/main.styl` — основной stylus-файл
* `src/assets/includes/main.js` — основной javascript-файл
* `src/assets/pages` — файлы страниц . Не забудьте импортировать их в `mothership.pug`
* `src/index.js` — основной файл проекта, в который подключаются / импортируются все необходимые библиотеки и происходит инициализация проекта
* `static/` — папка с дополнительными статическими ресурсами, которые будут скопированы в выходную папку `/dist`

<div align="center">
  <h2>Настройки:</h2>
</div>

## Основная конструкция:
Лёгкий способ переместить все файлы. По-умолчанию:
``` js
const PATHS = {
  // Путь к главной директории проекта
  src: path.join(__dirname, '../src'),
  // Путь к скомпилированным файлам
  dist: path.join(__dirname, '../dist'),
  // Путь к файлам в папке '/dist' (папка js / css / fonts и т. д.)
  assets: 'assets/'
}
```
## Кастомизация:
Вы можете использовать любые имена папок:
``` js
const PATHS = {
  // src должна быть src
  src: path.join(__dirname, '../src'),
  // dist в public
  dist: path.join(__dirname, '../public'),
  // assets в static
  assets: 'static/'
}
```

## Импорт других библиотек:
1. Установите библиотеки
2. Импортируйте библиотеки в `./index.js`
``` js
// пример React
import React from 'react'
// пример Bootstrap
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
// или
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Папка PUG-файлов:
#### По-умолчанию:
* .pug директория: `./src/assets/includes/pug`
* конфигурация в: `./build/webpack.base.conf.js`

**Использование:**

Все файлы должны быть созданы в папке `./src/assets/pages/`.
Пример:
``` bash
./src/assets/pages/index.pug
./src/assets/pages/about.pug
```

#### Изменение стандартной директории папки PUG:
Пример для `./src/pug/myNewFolder/pages`:
* Измените константу PAGES_DIR в `./build/webpack.base.conf.js`:
``` js
// Ваш новый путь
const PAGES_DIR = `${PATHS.src}/pug/myNewFolder/pages/`
```
3. Перезапустите dev-сервер Webpack

## Создание других PUG-файлов:
#### По-умолчанию:
Автоматическое создание любых pug-страниц:
1. Создайте другой pug-файл в `./src/assets/pages/`
2. Откройте новую страницу `http://localhost:8081/about.html` (Не забудьте ПЕРЕЗАПУСТИТЬ dev-сервер)

#### Второй метод:
Ручное (не автоматическое) создание любых pug-страниц (не забудьте ПЕРЕЗАПУСТИТЬ dev-сервер и ЗАКОММЕНТИРОВАТЬ строки выше)
1. Создайте другой pug-файл в `./src/assets/pages/`
2. Перейдите в `./build/webpack.base.conf.js`
3. Закомментируйте строки, указанные выше (автоматическое создание pug-страниц)
4. Создайте новую pug-страницу:
``` js
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/about/index.pug`,
      filename: './about/index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/about/portfolio.pug`,
      filename: './about/portfolio.html',
      inject: true
    })
```
5. Откройте новую страницу `http://localhost:8081/about.html` (Не забудьте ПЕРЕЗАПУСТИТЬ dev-сервер)

#### Третий метод: (ЛУЧШИЙ)
Комбинируйте первый и второй метод. Пример:
``` js
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/about/index.pug`,
      filename: './about/index.html',
      inject: true
    })
```

## Добавление шрифтов:
Добавьте @font-face в `/assets/includes/utils/fonts.styl`:

``` stylus
// Пример со шрифтом Roboto
@font-face
  font-family Roboto
  src url(/assets/fonts/Roboto/Regular/Roboto.eot) /* IE9 Compat Modes */
  src url(/assets/fonts/Roboto/Regular/Roboto.eot?#iefix) format('embedded-opentype'), /* IE6-IE8 */
      url(/assets/fonts/Roboto/Regular/Roboto.woff) format('woff'), /* Pretty Modern Browsers */
      url(/assets/fonts/Roboto/Regular/Roboto.woff2) format('woff2'), /* Pretty Modern Browsers */
      url(/assets/fonts/Roboto/Regular/Roboto.ttf) format('truetype'), /* Safari, Android, iOS */
      url(/assets/fonts/Roboto/Regular/Roboto.svg) format('svg') /* Legacy iOS */
```

Добавьте переменные для шрифта в `/assets/includes/utils/vars.styl`:

``` stylus
$mySecondFont  =  'Roboto', Arial, sans-serif
```


## Проверка работоспособности:
#### В режиме тестирования:
Запустите dev-сервер командой
``` bash
npm run dev
```

#### В режиме продакшена:
Запустите build-сборку командой
``` bash
npm run build
```

### Если используете GitHub Pages:
Если в стилях установлено фоновое изображение `background-image: url(...);` , то в выходном css-файле нужно изменить путь на **относительный**, например:
``` scss
было:
background-image: url(/assets/img/icon/webpack-icon.png);

стало:
background-image: url(../../assets/img/icon/webpack-icon.png);
```
> CSS не поддерживает путь от корня сайта, поэтому, если сразу прописать `url(../../assets/img/icon/webpack-icon.png)`, то Webpack обрежет путь и получится `url(./webpack-icon.png)`, что не корректно. Если оставить `url(/assets/img/icon/webpack-icon.png)`, то файл так же не будет найден.


## License
[MIT](./LICENSE)

Copyright (c) 2019-present, [Alexey Shelementev](https://github.com/rushelex) |
Original author: [Evgenii Vedegis](https://github.com/vedees/webpack-template)