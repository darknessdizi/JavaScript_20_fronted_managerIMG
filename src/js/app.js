import ManagerController from './imageManager/ManagerController';
import ManagerEdit from './imageManager/ManagerEdit';

const body = document.querySelector('body');
const manager = new ManagerEdit(body);
const controller = new ManagerController(manager);
controller.init();
