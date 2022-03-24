import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete To Do list project',
    completed: false,
    index: 2,
  },
];

function component() {
  for (let i = 0; i < tasks.length; i += 1) {
    const element = document.createElement('div');
    element.classList.add('list-content');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('list-check');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'check';

    const desc = document.createElement('label');
    desc.htmlFor = 'check';

    const moveIcon = document.createElement('i');
    moveIcon.classList.add('fa-solid');
    moveIcon.classList.add('fa-ellipsis-vertical');

    // Lodash, currently included via a script, is required for this line to work
    desc.innerHTML = _.join([tasks[i].description]);

    contentDiv.append(input, desc);
    element.append(contentDiv, moveIcon);
    const list = document.getElementById('list-items');

    list.append(element);
  }
}

component();
