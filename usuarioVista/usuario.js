// Obtener referencias a los botones
const catalogoBtn = document.getElementById('catalogoBtn');
const pedidosBtn = document.getElementById('pedidosBtn');
const comprarBtn = document.getElementById('comprarBtn');

// Agregar event listeners a los botones
catalogoBtn.addEventListener('click', () => {
    
    window.location.href = 'Catalogo.html';
    console.log('Mostrando catálogo');
});

pedidosBtn.addEventListener('click', () => {
    window.location.href = 'CatalogoCompras.html';
    console.log('Mostrando pedidos');
});

comprarBtn.addEventListener('click', () => {
    window.location.href = 'Compras.html';
    console.log('Comprando productos');
});