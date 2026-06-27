let tasks = JSON.parse(localStorage.getItem('ea_tasks') || '[]');

        function save() {
            localStorage.setItem('ea_tasks', JSON.stringify(tasks));
        }

        function render() {
            const list = document.getElementById('list');
            const done = tasks.filter(t => t.done).length;
            const total = tasks.length;

            document.getElementById('bar').style.width = total ? (done / total * 100) + '%' : '0%';
            document.getElementById('prog-text').textContent = `${done} of ${total} completed`;

            if (!total) {
                list.innerHTML = '<div class="empty">No tasks yet — add one above</div>';
                return;
            }

            list.innerHTML = '';
            tasks.forEach((t, i) => {
                const row = document.createElement('div');
                row.className = 'task';
                row.innerHTML = `
                    <div class="check ${t.done ? 'done' : ''}" onclick="toggle(${i})"></div>
                    <div class="task-text ${t.done ? 'done' : ''}">${t.text}</div>
                    <button class="del-btn" onclick="remove(${i})">✕</button>
                `;
                list.appendChild(row);
            });
        }

        function add() {
            const input = document.getElementById('input');
            const text = input.value.trim();
            if (!text) return;
            tasks.push({ text, done: false });
            input.value = '';
            save();
            render();
        }

        function toggle(i) {
            tasks[i].done = !tasks[i].done;
            save();
            render();
        }

        function remove(i) {
            tasks.splice(i, 1);
            save();
            render();
        }

        render();