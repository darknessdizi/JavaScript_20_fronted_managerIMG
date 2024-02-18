export default class ManagerController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.bindToDOM();
    this.edit.addClickConteinerListeners(ManagerController.onClickConteiner.bind(this));
    this.edit.addChangeInputListeners(this.onChangeInput.bind(this));
    this.edit.addSubmitFormListeners(this.onSubmitForm.bind(this));
    this.edit.addRemoveListeners(ManagerController.onRemoveClick);

    this.getImagesFromServer();

    this.edit.conteiner.addEventListener('dragover', (e) => {
      // Событие при переносе файлов из окна windows в браузер
      // Необходимо его сбросить
      e.preventDefault();
    });

    this.edit.conteiner.addEventListener('drop', (e) => {
      // Событие при переносе файлов из окна windows в браузер
      // Необходимо его сбросить
      e.preventDefault();
      const { files } = e.dataTransfer;
      if (!files) return;
      this.dropFiles(files);
    });
  }

  getImagesFromServer() {
    // Получение фотографий с сервера
    const xhr = new XMLHttpRequest();
    const method = 'method=getImages';

    xhr.addEventListener('load', this.callbackLoad.bind(this, xhr));

    xhr.open('GET', `http://localhost:9000?${method}`);
    xhr.send();
  }

  dropFiles(files) {
    // Отправка формы
    const formData = new FormData();
    for (const file of files) {
      const { name } = file;
      formData.append('file', file, name);
    }
    const xhr = new XMLHttpRequest();
    const method = 'method=dropImages';

    xhr.addEventListener('load', this.callbackLoad.bind(this, xhr));

    xhr.open('POST', `http://localhost:9000?${method}`);
    xhr.send(formData);
  }

  static onClickConteiner(event) {
    // Callback - нажали мышкой в поле контейнера input files
    const { target } = event;
    const parent = target.closest('.conteiner__frame');
    const input = parent.querySelector('.frame_input');
    // Назначаем полю input событие мыши click
    input.dispatchEvent(new MouseEvent('click'));
  }

  onChangeInput(event) {
    // В поле input выбрали фото и нажали открыть
    const { files } = event.target;
    if (!files) return;
    this.edit.conteiner.dispatchEvent(new Event('submit'));
    const cell = event.target;
    cell.value = ''; // Чтобы повторно открывать один и тот же файл
  }

  onSubmitForm() {
    // Отправка формы
    const body = new FormData(this.edit.conteiner); // Считывает поля name у элементов
    const xhr = new XMLHttpRequest();
    const method = 'method=addImages';

    xhr.addEventListener('load', this.callbackLoad.bind(this, xhr));

    xhr.open('POST', `http://localhost:9000?${method}`);
    xhr.send(body);
  }

  static onRemoveClick(event) {
    // Удаление фотографии
    const { target } = event;
    const parent = target.closest('.image__conteiner');
    const img = parent.querySelector('img');
    const xhr = new XMLHttpRequest();
    const method = `method=removeImage&id=${img.id}`;

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) { // получен ответ
        parent.remove();
      }
    });

    xhr.open('POST', `http://localhost:9000?${method}`);
    xhr.send();
  }

  callbackLoad(xhr) {
    // Callback - при получении ответа от сервера содержащего список фотографий
    if (xhr.status >= 200 && xhr.status < 300) { // получен ответ
      const array = JSON.parse(xhr.responseText);
      for (const obj of array) {
        const url = `http://localhost:9000${obj.path}`;
        this.edit.createDivImage(obj.id, obj.name, url);
      }
    }
  }
}
