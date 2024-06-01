const form = document.getElementById('loginForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'ADMIN' && password === 'admin123') {
        window.location.href = '../adminVista/Administrador.html';
    } else if (username === 'USUARIO' && password === 'usuario123') {
        window.location.href = '../usuarioVista/usuario.html';
    } else {
        alert('Credenciales inválidas');
    }
});