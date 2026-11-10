# MathAI – AI-Supported Assessment Platform

Учебный проект: сайт, который показывает, как искусственный интеллект помогает в оценивании по математике и в обратной связи для студентов. Весь текст на сайте написан на английском (уровень A2–B1).

An academic project that shows how AI can support mathematics assessment and student feedback.

## Что внутри / Sections

1. **Home** – MathAI: Learn, Test, Improve.
2. **Quiz** – интерактивный тест из 7 вопросов (Basic Mathematics – Word Problems): выбор ответа, кнопка Submit Answers, результат из 7, правильные и неправильные ответы, объяснения, кнопка Retake Quiz. Ключ ответов для учителя (Answer Key).
3. **AI Feedback** – пять примеров ответов студентов на вопрос 2, уровень, AI-отзыв и проверка учителем.
4. **AI Prompts** – два промпта, которые использовались (с кнопкой копирования).
5. **Human Review** – что исправил учитель в AI-отзывах.
6. **Reflection** – рефлексия «My Reflection on Using AI for Assessment».
7. **Thank You** – финальная страница.

## Файлы

```
index.html   – структура страницы
styles.css   – стили (светлая и тёмная тема, адаптивность)
script.js    – логика теста, карточки студентов, меню
README.md    – это описание
```

Сборка не нужна: это обычный HTML, CSS и JavaScript без библиотек. Шрифты (Inter и Space Grotesk) подключаются из Google Fonts; без интернета сайт покажется системным шрифтом.

## Как запустить

Откройте `index.html` в браузере (двойной клик по файлу).

## Как выложить на GitHub Pages

1. Создайте репозиторий на GitHub (например, `mathai`).
2. Загрузите в него все четыре файла (кнопка **Add file → Upload files**).
3. Откройте **Settings → Pages**.
4. В разделе **Build and deployment** выберите **Deploy from a branch**, ветку `main` и папку `/ (root)`, нажмите **Save**.
5. Через минуту-две сайт будет доступен по адресу `https://<ваш-логин>.github.io/mathai/`.

## Через командную строку

```bash
git init
git add .
git commit -m "Add MathAI website"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/mathai.git
git push -u origin main
```
