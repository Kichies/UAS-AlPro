document.addEventListener('DOMContentLoaded', function() {
  const inputBox = document.getElementById('input-box');
  const addButton = document.getElementById('add-button');
  const taskList = document.getElementById('task-list');


  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const taskItem = document.createElement('li');
          const checkButton = document.createElement('input');
          checkButton.type = 'checkbox';
          checkButton.classList.add('check-button');
          checkButton.checked = task.completed;
          checkButton.addEventListener('change', () => {
              task.completed = checkButton.checked;
              updateLocalStorage();
              renderTasks();
          });

          const taskText = document.createElement('span');
          taskText.innerText = task.text;
          taskText.classList.add('task-text');
          if (task.completed) {
              taskItem.classList.add('completed');
          }

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Hapus';
          deleteButton.classList.add('delete-button');
          deleteButton.addEventListener('click', () => {
              tasks.splice(index, 1);
              updateLocalStorage();
              renderTasks();
          });

          taskItem.appendChild(checkButton);
          taskItem.appendChild(taskText);
          taskItem.appendChild(deleteButton);
          taskList.appendChild(taskItem);
      });
  };

  const updateLocalStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  addButton.addEventListener('click', () => {
      const task = inputBox.value.trim();
      if (task) {
          tasks.push({ text: task, completed: false });
          inputBox.value = '';
          updateLocalStorage();
          renderTasks();
      }
  });

  renderTasks();
});
