document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('carrito-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const clienteId = document.getElementById('cliente-id').value;
        const productoId = document.getElementById('producto-id').value;

        fetch('http://localhost:8080/api2/carritos/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'clienteId': clienteId,
                'productoId': productoId
            })
        })
        .then(response => response.text())
        .then(data => {
            messageDiv.textContent = data;
            form.reset();
        })
        .catch(error => {
            messageDiv.textContent = 'Error: ' + error;
        });
    });
});