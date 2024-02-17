export default class ManagerController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.bindToDOM();
    this.edit.addClickConteinerListeners(ManagerController.onClickConteiner.bind(this));
    this.edit.addChangeInputListeners(this.onChangeInput.bind(this));
    this.edit.addSubmitFormListeners(this.onSubmitForm.bind(this));
    this.edit.addRemoveListeners(this.onRemoveClick.bind(this));

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

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) { // получен ответ
        const obj = JSON.parse(xhr.responseText);
        for (const item of Object.entries(obj)) {
          console.log('item', item)
          const url = 'http://localhost:9000' + item[1].path;
          this.edit.createDivImage(item[0], item[1].name, url);
        }
      }
    });

    xhr.open('GET', `http://localhost:9000?${method}`);
    xhr.send(); 
  }

  dropFiles(files) {
    // Отправка формы
    const formData = new FormData();
    for (const file of files) {
      const name = file.name;
      formData.append('file', file, name);
    }
    const xhr = new XMLHttpRequest();
    const method = 'method=dropImages';

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) { // получен ответ
        const obj = JSON.parse(xhr.responseText);
        for (const item of Object.entries(obj)) {
          const url = 'http://localhost:9000' + item[1].path;
          this.edit.createDivImage(item[0], item[1].name, url);
        }
      }
    });

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

  onSubmitForm(event) {
    // Отправка формы
    const body = new FormData(this.edit.conteiner); // Считывает поля name у элементов
    const xhr = new XMLHttpRequest();
    const method = 'method=addImages';

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) { // получен ответ
        const obj = JSON.parse(xhr.responseText);
        for (const item of Object.entries(obj)) {
          const url = 'http://localhost:9000' + item[1].path;
          this.edit.createDivImage(item[0], item[1].name, url);
        }
      }
    });

    xhr.open('POST', `http://localhost:9000?${method}`);
    xhr.send(body);
  }

  onRemoveClick(event) {
    // Удаление фотограффии
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
}
