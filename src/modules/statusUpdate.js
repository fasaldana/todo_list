const complete = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const checkbox = document.querySelectorAll('.check');
  for (let i = 0; i < tasks.length; i += 1) {
    checkbox[i].addEventListener('change', (e) => {
      if (e.target.checked) {
        console.log('checked');
        tasks[i].completed = true;
      } else {
        console.log('Notchecked');
        tasks[i].completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
};

export default complete;
