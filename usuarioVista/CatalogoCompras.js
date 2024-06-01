let currentPage = 0;
const pageSize = 5;

document.addEventListener('DOMContentLoaded', fetchProducts);

function fetchProducts() {
    const category = document.getElementById('category').value;
    const url = new URL('http://localhost:8080/api2/productcatalogo');
    url.searchParams.append('page', currentPage);
    url.searchParams.append('size', pageSize);
    if (category) {
        url.searchParams.append('category', category);
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.content);
            document.getElementById('prev-btn').disabled = data.first;
            document.getElementById('next-btn').disabled = data.last;
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const clienteId = document.getElementById('cliente-id').value;
    if (!clienteId) {
        alert('Por favor, ingrese un ID de cliente válido.');
        return;
    }

    fetch('http://localhost:8080/api2/carritos/agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'clienteId': clienteId,
            'productoId': productId
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

function nextPage() {
    currentPage++;
    fetchProducts();
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
    }
    fetchProducts();
}