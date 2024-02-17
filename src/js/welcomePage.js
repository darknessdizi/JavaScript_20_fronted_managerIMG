import ManagerController from './imageManager/ManagerController';
import ManagerEdit from './imageManager/ManagerEdit';

function createLinks() {
  // Создаем ссылки на наши задачи
  const main = document.createElement('main');
  main.classList.add('content');
  const listTask = [runTask2];

  for (let i = 0; i < listTask.length; i += 1) {
    const link = document.createElement('a');
    link.classList.add('link__task');
    link.textContent = `Задача ${i + 1}`;
    main.append(link);
    link.addEventListener('click', listTask[i]);
  }
  return main;
}

const body = document.querySelector('body');
const mainDiv = createLinks();
body.append(mainDiv);

function onReturnClick() {
  // Обработчик события нажатия кнопки Return
  body.className = '';
  body.innerHTML = '';
  body.append(mainDiv);
}

function createButton(mainBlock) {
  // Создаем кнопку возврата на главную страницу
  const btn = document.createElement('button');
  btn.textContent = 'Return';
  btn.classList.add('btn-return');
  mainBlock.append(btn);
  btn.addEventListener('click', (event) => onReturnClick(event));
}

function runTask2() {
  // Запуск задачи 2
  body.innerHTML = '';
  body.classList.add('task-2');
  const manager = new ManagerEdit(body);
  const controller = new ManagerController(manager);
  controller.init();
  createButton(body);
}
