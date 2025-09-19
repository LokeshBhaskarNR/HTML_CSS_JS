let tasks = [];
let nextTaskId = 6;
async function fetchTasks() {
    try {
        const response = await fetch('todos.json');
        const data = await response.json();
        tasks = data.slice(0, 5);
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        document.getElementById('loading').innerHTML = 'Error loading todos.json file. Please ensure the file exists in the same directory.';
    }
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    const loading = document.getElementById('loading');
    
    if (loading) {
        loading.remove();
    }

    if (tasks.length === 0) {
        container.innerHTML = '<div class="no-tasks">No tasks available. Add your first task!</div>';
        return;
    }

    container.innerHTML = tasks.map(task => {
        const statusClass = task.completed ? 'completed' : 'pending';
        const statusText = task.completed ? 'Completed' : 'Pending';
        
        return `
            <div class="task-item ${statusClass}">
                <div class="task-title">${task.title}</div>
                <span class="task-status ${statusClass}">${statusText}</span>
            </div>
        `;
    }).join('');
}

function toggleForm() {
    const form = document.getElementById('taskForm');
    form.classList.toggle('active');
    
    if (form.classList.contains('active')) {
        document.getElementById('taskTitle').focus();
    }
}

function cancelForm() {
    const form = document.getElementById('taskForm');
    form.classList.remove('active');
    
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskStatus').value = 'false';
}

function addTask() {
    const titleInput = document.getElementById('taskTitle');
    const statusSelect = document.getElementById('taskStatus');
    
    const title = titleInput.value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        id: nextTaskId++,
        title: title,
        completed: statusSelect.value === 'true',
        userId: 1
    };

    tasks.push(newTask);
    
    renderTasks();
    
    cancelForm();
    
    const addBtn = document.querySelector('.add-task-btn');
    const originalText = addBtn.textContent;
    addBtn.textContent = '✓ Task Added!';
    addBtn.style.background = '#28a745';
    
    setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.style.background = '#667eea';
    }, 2000);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('taskForm').classList.contains('active')) {
        e.preventDefault();
        addTask();
    }
    
    if (e.key === 'Escape' && document.getElementById('taskForm').classList.contains('active')) {
        cancelForm();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
});
