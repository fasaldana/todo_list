import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
export class TaskList {
  list = document.getElementById('list-items');

  createEmpty = () => {
    const tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  add = (e) => {
    const taskName = document.getElementById('task').value;
    const tasks = [];

    const task = {
      taskName,
      completed: false,
      index: tasks.length,
    };
    if (localStorage.getItem('tasks') === null) {
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      task.index = tasks.length;
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    document.getElementById('form').reset();
    e.preventDefault();
  };

  remove = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1 - 1;
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

  removeComplete = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.filter((tsk) => tsk.completed === true);
    task.forEach((e) => {
      tasks.splice(
        tasks.findIndex((f) => f.completed === e.completed),
        1,
      );
    });
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1 - 1;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload();
  };

  loadScreen() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
      this.createEmpty();
    }
    for (let i = 0; i < tasks.length; i += 1) {
      const { taskName, completed, index } = tasks[i];
      const element = document.createElement('div');
      element.classList.add('list-content');

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('list-check');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('check');

      const desc = document.createElement('label');
      desc.classList.add('task-label');
      desc.contentEditable = 'true';

      if (completed) {
        desc.style.textDecoration = 'line-through';
        desc.style.color = '#c0c0c0';
        input.checked = true;
      } else {
        desc.style.textDecoration = 'none';
        desc.style.color = '#000';
        input.checked = false;
      }

      const moveIcon = document.createElement('i');
      moveIcon.classList.add('fa-solid');
      moveIcon.classList.add('fa-ellipsis-vertical');
      moveIcon.style.display = 'none';

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
        this.edit(i, desc.innerHTML);
      });

      contentDiv.append(input, desc);
      element.append(contentDiv, moveIcon, deleteIcon);
      const list = document.getElementById('list-items');
      list.append(element);
    }
  }
}
