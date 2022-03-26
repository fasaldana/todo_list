const complete = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const text = document.querySelectorAll('.task-label');
  const checkbox = document.querySelectorAll('.check');
  for (let i = 0; i < tasks.length; i += 1) {
    checkbox[i].addEventListener('change', (e) => {
      if (e.target.checked) {
        tasks[i].completed = true;
        text[i].style.textDecoration = 'line-through';
        text[i].style.color = '#c0c0c0';
      } else {
        tasks[i].completed = false;
        text[i].style.textDecoration = 'none';
        text[i].style.color = '#000';
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
};

export default complete;
