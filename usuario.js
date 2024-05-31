// Obtener referencias a los botones
const catalogoBtn = document.getElementById('catalogoBtn');
const pedidosBtn = document.getElementById('pedidosBtn');
const comprarBtn = document.getElementById('comprarBtn');

// Agregar event listeners a los botones
catalogoBtn.addEventListener('click', () => {
    // Lógica para mostrar el catálogo
    console.log('Mostrando catálogo');
});

pedidosBtn.addEventListener('click', () => {
    // Lógica para mostrar los pedidos
    console.log('Mostrando pedidos');
});

comprarBtn.addEventListener('click', () => {
    // Lógica para comprar productos
    console.log('Comprando productos');
});