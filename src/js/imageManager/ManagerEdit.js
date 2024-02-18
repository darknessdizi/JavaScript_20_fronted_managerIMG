export default class ManagerEdit {
  constructor(parent) {
    this.parent = parent;
    this.divImgs = null;
    this.conteiner = null;
    this.clickConteinerListeners = [];
    this.changeInputListeners = [];
    this.submitFormListeners = [];
    this.removeListeners = [];
  }

  bindToDOM() {
    // Добавляет поле main к элементу body
    const main = ManagerEdit.addTagHTML(this.parent, 'content-task', 'main');
    this.addTagInputFile(main);
    this.divImgs = ManagerEdit.addTagHTML(main, 'conteiner__images');
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  createDivImage(id, name, url) {
    // Создает один блок с фотограффией
    const img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src', url);
    img.setAttribute('alt', name);
    img.setAttribute('title', name);
    img.setAttribute('id', id);
    img.addEventListener('load', (event) => this.onLoad(event));
  }

  onLoad(event) {
    // Успешная загрузка фото, добавление фото на доску
    const imgDiv = ManagerEdit.addTagHTML(this.divImgs, 'image__conteiner');
    imgDiv.append(event.target);

    const link = ManagerEdit.addTagHTML(imgDiv, 'image__delete', 'a');
    link.textContent = 'X';
    link.addEventListener('click', (event) => this.onRemoveClick(event));
  }

  addTagInputFile(parent) {
    // Создает поле input (для файлов) с перекрытием
    this.conteiner = ManagerEdit.addTagHTML(parent, 'conteiner__frame', 'form');
    this.conteiner.addEventListener('click', (event) => this.onClickConteiner(event));
    this.conteiner.addEventListener('submit', (event) => this.onSubmitForm(event));

    const input = ManagerEdit.addTagHTML(this.conteiner, 'frame_input', 'input');
    input.setAttribute('accept', 'image/*'); // Фильтр (только картинки можно выбрать)
    input.setAttribute('multiple', ''); // Множественный выбор элементов
    input.setAttribute('name', 'file'); // нужно для получения FormData
    input.type = 'file';
    input.addEventListener('change', (event) => this.onChangeInput(event));

    const divSpan = ManagerEdit.addTagHTML(this.conteiner, 'frame_span');
    const span = ManagerEdit.addTagHTML(divSpan, 'span_text', 'span');
    span.textContent = 'Drag and Drop files here or Click to select';
  }

  onClickConteiner(event) {
    event.preventDefault();
    this.clickConteinerListeners.forEach((o) => o.call(null, event));
  }

  addClickConteinerListeners(callback) {
    // Сохранение callback для поля input (загрузка файлов))
    this.clickConteinerListeners.push(callback);
  }

  onChangeInput(event) {
    event.preventDefault();
    this.changeInputListeners.forEach((o) => o.call(null, event));
  }

  addChangeInputListeners(callback) {
    // Сохранение callback для поля input (загрузка файлов))
    this.changeInputListeners.push(callback);
  }

  onSubmitForm(event) {
    event.preventDefault();
    this.submitFormListeners.forEach((o) => o.call(null, event));
  }

  addSubmitFormListeners(callback) {
    // Сохранение callback для поля input (загрузка файлов))
    this.submitFormListeners.push(callback);
  }

  onRemoveClick(event) {
    this.removeListeners.forEach((o) => o.call(null, event));
  }

  addRemoveListeners(callback) {
    // Сохранение callback для поля input (загрузка файлов))
    this.removeListeners.push(callback);
  }
}
