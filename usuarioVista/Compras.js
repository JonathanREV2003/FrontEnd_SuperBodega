document.getElementById('compraForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const clienteId = document.getElementById('clienteId').value;
    const productoIds = document.getElementById('productoIds').value.split(',').map(id => id.trim());

    fetch(`http://localhost:8080/api2/compras/realizar?clienteId=${clienteId}&productoIds=${productoIds.join(',')}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = `Error al realizar compra: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('response').innerText = `Compra realizada con éxito: `;
    });
});
