let tasks = [];
let next_id = 1;

document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Gather up the form data.
  const form = e.target;
  const form_data = new FormData(form);
  const data = Object.fromEntries(form_data.entries());

  // Prevent blank task names
  if (!data.task_name || data.task_name.trim() == "") {
    alert("Task name cannot be blank.");
    return;
  }

  // Create new task.
  const new_task = create_new_task(data);

  // Add new task to array and display in browser.
  add_task_to_manager(new_task);
  tasks.push(new_task);
  console.log(JSON.stringify(tasks));
});

/**
 * Function to create a new task with the form data.
 * 
 * @param {object} data - The form data as an object.
 * @returns {object} The new task.
 */
function create_new_task(data) {
  const now = new Date();
  const formatted_date = now.toLocaleDateString();
  const task = {
    id: next_id,
    name: data.task_name,
    priority: data.task_priority,
    important: (data.task_important) ? true : false,
    complete: false,
    date: formatted_date,
  }
  next_id++;

  return task;
}

/**
 * Function to add the task to the manager table.
 * 
 * This function also handles all of the checkboxes and buttons
 * for each row added to the task manager.
 * 
 * @param {object} task 
 */
function add_task_to_manager(task) {
  const tbody = document.querySelector('#task-table tbody');
  const row = document.createElement('tr');
  
  let priority;
  switch(task.priority) {
    case 'low':
      priority = '';
      break;
    case 'medium':
      priority = 'font-style: italic';
      break;
    case 'high':
      priority = 'font-weight: bold';
      break;
    default:
      // handle exception
  }
  const name_style = {
    strikethrough: (task.complete) ? 'line-through' : '',
    style: priority,
    highlight: (task.important) ? 'red' : '',
  }

  // Create row using task data
  row.innerHTML = `
    <td class="task-name" style="text-decoration: ${name_style.strikethrough}; color: ${name_style.highlight}; ${priority}">${task.name}</td>
    <td>${task.date}</td>
    <td><input class="complete-checkbox" type="checkbox" ${task.complete ? 'checked' : ''}></td>
    <td><button class="delete-button">Delete Task</button></td>
  `;
  tbody.appendChild(row);
  console.log(JSON.stringify(tasks));

  const task_name = row.querySelector('.task-name');

  // Add complete checkbox.
  const complete_checkbox = row.querySelector('.complete-checkbox');
  complete_checkbox.addEventListener('change', () => {
    if (complete_checkbox.checked) {
      task_name.style.textDecoration = 'line-through';
      task.complete = true;
    } else {
      task_name.style.textDecoration = '';
      task.complete = false;
    }
    console.log(JSON.stringify(tasks));
  });

  // Add delete button.
  const delete_button = row.querySelector('.delete-button');
  delete_button.addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    row.remove();
    console.log(JSON.stringify(tasks));
  });
}