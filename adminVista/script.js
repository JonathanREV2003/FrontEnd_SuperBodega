const form = document.getElementById('productForm');
//funcion agregar productos
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const product = {
        name,
        price,
        description
    };

    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Producto agregado exitosamente');
            form.reset();
        } else {
            alert('Error al agregar el producto');
        }
    } catch (error) {
        alert('Error en la solicitud');
        console.error(error);
    }
});

//menu despleglable
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function showSection(sectionId) {
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById(sectionId).style.display = "block";
}

//Mostrar productos y eliminar productos por id: 
document.addEventListener('DOMContentLoaded', () => {
    const viewProductsTab = document.getElementById('view-products');
    const addProductTab = document.getElementById('add-product');
    const productList = document.getElementById('product-list');

    function fetchProducts() {
        fetch('http://localhost:8080/api/products', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
            .then(data => {
                productList.innerHTML = '';
                data.forEach(product => {
                    const productItem = document.createElement('li');

                    const productDetails = document.createElement('div');
                    productDetails.classList.add('product-details');


                    const productName = document.createElement('div');
                    productName.classList.add('product-name');
                    productName.textContent = product.name;

                    const productPrice = document.createElement('div');
                    productPrice.classList.add('product-price');
                    productPrice.textContent = `Precio: $${product.price.toFixed(2)}`;

                    const productDescription = document.createElement('div');
                    productDescription.classList.add('product-description');
                    productDescription.textContent = product.descriotion; 

                    
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.addEventListener('click', () => {
                        fetch(`http://localhost:8080/api/products/${product.id}`, {
                            method: 'DELETE'
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok ' + response.statusText);
                            }
                            productList.removeChild(productItem);
                        })
                        .catch(error => console.error('Error deleting data:', error));
                    });

                    productDetails.appendChild(productName);
                    productDetails.appendChild(productPrice);
                    productDetails.appendChild(productDescription);

                    productItem.appendChild(productDetails);
                    productItem.appendChild(deleteButton);

                    productList.appendChild(productItem);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    fetchProducts();

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    const addProductForm = document.getElementById('add-product-form');
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = new FormData(addProductForm);
        const productData = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description')
        };

        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            addProductForm.reset();
            fetchProducts();
            document.querySelector('.tab-button[data-tab="view-products"]').click();
        })
        .catch(error => console.error('Error adding product:', error));
    });
});

//editar Producto

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const productId = document.getElementById('productId').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;

  const updatedProduct = {
    name,
    price,
    description
  };

  fetch(`http://localhost:8080/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  })
  .then(response => {
    if (response.ok) {
      alert('Producto actualizado correctamente');
      // realizar acciones adicionales después de actualizar el producto
    } else {
      alert('Error al actualizar el producto');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al actualizar el producto');
  });
}); 