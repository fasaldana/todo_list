import './style.css';
import { TaskList } from './modules/tasks';
import complete from './modules/statusUpdate.js';

const task = new TaskList();
document.querySelector('#task').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    task.add();
  }
});
task.loadScreen();
complete();
document.querySelector('.clear-btn').addEventListener('click', () => {
  task.removeComplete();
});
