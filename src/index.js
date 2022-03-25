import './style.css';
import { TaskList } from './modules/tasks';

const task = new TaskList();
document.querySelector('#task').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    task.add();
  }
});
task.loadScreen();
