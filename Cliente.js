// Función para agregar un nuevo cliente
const clienteForm = document.getElementById('clienteForm');
clienteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    // Aquí puedes agregar la lógica para enviar los datos del cliente al servidor
    // y actualizar la lista de clientes en el DOM

    // Reiniciar el formulario
    clienteForm.reset();
});

// Función para cargar la lista de clientes desde el servidor
function cargarClientes() {
    // Aquí puedes agregar la lógica para obtener los datos de los clientes desde el servidor
    // y crear los elementos <li> correspondientes dentro de la lista #clienteList
}

// Llamar a la función cargarClientes() al cargar la página
window.onload = cargarClientes;