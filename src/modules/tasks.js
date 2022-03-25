import _ from 'lodash';
export class TaskList {
  list = document.getElementById('list-items');

  constructor() {
    this.todos = [];
  }

  createEmpty = () => {
    const tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('done');
  };

  add = (e) => {
    console.log('hola');
    const taskName = document.getElementById('task').value;
    let index;
    const tasks = [];

    const task = {
      taskName,
      completed: false,
      index: tasks.length,
    };
    if (localStorage.getItem('tasks') === null) {
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('hola');
    } else {
      console.log('hola');
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      task.index = tasks.length;
      console.log(task.taskName);
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    document.getElementById('form').reset();
    e.preventDefault();
  };

  remove = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i += 1) {
      if (index === tasks[i].index) {
        tasks.splice(i, 1);
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload();
  };

  edit = (index, description) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i += 1) {
      if (index === tasks[i].index) {
        tasks[i].taskName = description;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  loadScreen() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
      this.createEmpty();
    }
    for (let i = 0; i < tasks.length; i += 1) {
      console.log(tasks);
      const { taskName, index } = tasks[i];
      const element = document.createElement('div');
      element.classList.add('list-content');

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('list-check');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'check';

      const desc = document.createElement('label');
      desc.id = 'task-label';
      desc.contentEditable = 'true';

      const descChange = document.createElement('input');
      descChange.type = 'text';
      descChange.id = 'input-edit';
      descChange.style.display = 'none';

      const moveIcon = document.createElement('i');
      moveIcon.classList.add('fa-solid');
      moveIcon.classList.add('fa-ellipsis-vertical');

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa-solid');
      deleteIcon.classList.add('fa-trash-can');
      deleteIcon.addEventListener('click', () => {
        this.remove(index);
      });

      desc.innerHTML = _.join([taskName]);

      desc.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
      desc.addEventListener('input', () => {
        console.log('fol');
        this.edit(i, desc.innerHTML);
      });

      contentDiv.append(input, desc, descChange);
      element.append(contentDiv, moveIcon, deleteIcon);
      const list = document.getElementById('list-items');

      list.append(element);
    }
  }
}
