// Función para obtener los usuarios almacenados
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

// Función para guardar los usuarios
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registro de usuario
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const message = document.getElementById('registerMessage');

    if (username.length < 4 || password.length < 6) {
        message.textContent = "El usuario debe tener al menos 4 caracteres y la contraseña 6 caracteres.";
        return;
    }

    const users = getUsers();
    if (users.some(user => user.username === username)) {
        message.textContent = 'El usuario ya existe. Intenta con otro nombre de usuario.';
        return;
    }

    users.push({ username, password });
    saveUsers(users);
    alert('Usuario registrado exitosamente');
    window.location.href = 'index.html';
});

// Inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('loginMessage');

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'admin.html';
    } else {
        message.textContent = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
    }
});

// Gestión de usuarios y cierre de sesión
if (window.location.pathname.includes('admin.html')) {
    const tbody = document.querySelector('#userTable tbody');
    const users = getUsers();

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
        `;
        row.querySelector('.delete-btn').addEventListener('click', () => {
            const index = users.findIndex(u => u.username === user.username);
            users.splice(index, 1);
            saveUsers(users);
            row.remove();
        });
        tbody.appendChild(row);
    });
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
