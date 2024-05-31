    // Función para agregar un nuevo proveedor
const proveedorForm = document.getElementById('proveedorForm');
proveedorForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    // Aquí puedes agregar la lógica para enviar los datos del proveedor al servidor
    // y actualizar la lista de proveedores en el DOM

    // Reiniciar el formulario
    proveedorForm.reset();
});

    // Función para cargar la lista de proveedores desde el servidor
function cargarProveedores() {
    // Aquí puedes agregar la lógica para obtener los datos de los proveedores desde el servidor
    // y crear los elementos <li> correspondientes dentro de la lista #proveedorList
}

    // Llamar a la función cargarProveedores() al cargar la página
window.onload = cargarProveedores;