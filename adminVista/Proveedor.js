document.getElementById('supplierForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const proveedor = {
        nombre: document.getElementById('nombre').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8080/api/proveedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedor)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        document.getElementById('message').innerText = 'Proveedor agregado con éxito!';
        document.getElementById('supplierForm').reset();
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error al agregar el proveedor';
    });
});

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

document.addEventListener('DOMContentLoaded', () => {
    const supplierList = document.getElementById('supplier-list');

    function fetchSuppliers() {
        fetch('http://localhost:8080/api/proveedores', {
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
            supplierList.innerHTML = '';
            data.forEach(supplier => {
                const supplierItem = document.createElement('li');

                const supplierDetails = document.createElement('div');
                supplierDetails.classList.add('supplier-details');

                const supplierId = document.createElement('div');
                supplierId.classList.add('supplier-id');
                supplierId.textContent = `ID: ${supplier.id}`;

                const supplierName = document.createElement('div');
                supplierName.classList.add('supplier-name');
                supplierName.textContent = `Nombre: ${supplier.nombre}`;

                const supplierDireccion = document.createElement('div');
                supplierDireccion.classList.add('supplier-direccion');
                supplierDireccion.textContent = `Dirección: ${supplier.direccion}`;

                const supplierTelefono = document.createElement('div');
                supplierTelefono.classList.add('supplier-telefono');
                supplierTelefono.textContent = `Teléfono: ${supplier.telefono}`;

                const supplierEmail = document.createElement('div');
                supplierEmail.classList.add('supplier-email');
                supplierEmail.textContent = `Email: ${supplier.email}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:8080/api/proveedores/${supplier.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        supplierList.removeChild(supplierItem);
                    })
                    .catch(error => console.error('Error deleting data:', error));
                });

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => {
                    document.getElementById('editSupplierId').value = supplier.id;
                    document.getElementById('editNombre').value = supplier.nombre;
                    document.getElementById('editDireccion').value = supplier.direccion;
                    document.getElementById('editTelefono').value = supplier.telefono;
                    document.getElementById('editEmail').value = supplier.email;

                    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
                    document.getElementById('editSupplier').style.display = 'block';
                });

                supplierDetails.appendChild(supplierId);
                supplierDetails.appendChild(supplierName);
                supplierDetails.appendChild(supplierDireccion);
                supplierDetails.appendChild(supplierTelefono);
                supplierDetails.appendChild(supplierEmail);

                supplierItem.appendChild(supplierDetails);
                supplierItem.appendChild(editButton);
                supplierItem.appendChild(deleteButton);

                supplierList.appendChild(supplierItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    fetchSuppliers();
});

document.getElementById('editSupplierForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const supplierId = document.getElementById('editSupplierId').value;
    const proveedor = {
        nombre: document.getElementById('editNombre').value,
        direccion: document.getElementById('editDireccion').value,
        telefono: document.getElementById('editTelefono').value,
        email: document.getElementById('editEmail').value
    };

    fetch(`http://localhost:8080/api/proveedores/${supplierId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedor)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        document.getElementById('editMessage').innerText = 'Proveedor actualizado con éxito!';
        document.getElementById('editSupplierForm').reset();
    })
    .catch(error => {
        document.getElementById('editMessage').innerText = 'Error al actualizar el proveedor';
    });
});
