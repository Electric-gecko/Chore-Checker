// Helper functions for localStorage
function getChores() {
    return JSON.parse(localStorage.getItem('chores') || '[]');
}
function saveChores(chores) {
    localStorage.setItem('chores', JSON.stringify(chores));
}

// Render chore list
function renderChores() {
    const chores = getChores();
    const list = document.getElementById('chore-list');
    list.innerHTML = '';
    chores.forEach((chore, idx) => {
        const li = document.createElement('li');
        li.className = chore.completed ? 'completed' : '';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = chore.completed;
        checkbox.addEventListener('change', () => {
            chores[idx].completed = checkbox.checked;
            saveChores(chores);
            renderChores();
        });
        const span = document.createElement('span');
        span.textContent = chore.text;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            chores.splice(idx, 1);
            saveChores(chores);
            renderChores();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

// Add new chore
document.getElementById('chore-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('chore-input');
    const chores = getChores();
    chores.push({ text: input.value, completed: false });
    saveChores(chores);
    input.value = '';
    renderChores();
});

// Initial render
renderChores();