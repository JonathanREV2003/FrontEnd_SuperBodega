document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value
    };

    fetch('http://localhost:8080/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        document.getElementById('message').innerText = 'Cliente agregado con éxito!';
        document.getElementById('clienteForm').reset();
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error al agregar el cliente';
    });
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

//Mostrar cliente y eliminar cliente por id: 
document.addEventListener('DOMContentLoaded', () => {
    const viewClientsTab = document.getElementById('view-clients');
    const addClientTab = document.getElementById('add-client');
    const clientList = document.getElementById('client-list');

    function fetchClients() {
        fetch('http://localhost:8080/api/clientes', {
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
            clientList.innerHTML = '';
            data.forEach(client => {
                const clientItem = document.createElement('li');

                const clientDetails = document.createElement('div');
                clientDetails.classList.add('client-details');

                const clientId = document.createElement('div');
                clientId.classList.add('client-id');
                clientId.textContent = `ID: ${client.id}`;

                const clientName = document.createElement('div');
                clientName.classList.add('client-name');
                clientName.textContent = `Nombre: ${client.nombre}`;

                const clientApellido = document.createElement('div');
                clientApellido.classList.add('client-apellido');
                clientApellido.textContent = `Apellido: ${client.apellido}`;

                const clientDireccion = document.createElement('div');
                clientDireccion.classList.add('client-direccion');
                clientDireccion.textContent = `Dirección: ${client.direccion}`;

                const clientTelefono = document.createElement('div');
                clientTelefono.classList.add('client-telefono');
                clientTelefono.textContent = `Teléfono: ${client.telefono}`;

                const clientEmail = document.createElement('div');
                clientEmail.classList.add('client-email');
                clientEmail.textContent = `Email: ${client.email}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:8080/api/clientes/${client.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        clientList.removeChild(clientItem);
                    })
                    .catch(error => console.error('Error deleting data:', error));
                });

                clientDetails.appendChild(clientId);
                clientDetails.appendChild(clientName);
                clientDetails.appendChild(clientApellido);
                clientDetails.appendChild(clientDireccion);
                clientDetails.appendChild(clientTelefono);
                clientDetails.appendChild(clientEmail);

                clientItem.appendChild(clientDetails);
                clientItem.appendChild(deleteButton);

                clientList.appendChild(clientItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // Llamada inicial para cargar los clientes
    fetchClients();

});
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});