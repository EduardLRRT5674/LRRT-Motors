document.addEventListener('DOMContentLoaded', function() {

    // Añadir al inicio del script (después de document.addEventListener)
// Credenciales de administrador (en un sistema real esto estaría en el backend)
const adminCredentials = {
    email: "admin@automarket.com",
    password: "Admin1234"
};

// Estado de la sesión
let adminLoggedIn = false;

// Elementos del DOM para el login
const loginModal = document.getElementById('login-modal');
const closeModalBtn = document.querySelector('.close-modal');
const adminLoginForm = document.getElementById('admin-login-form');
const adminPanel = document.getElementById('admin-panel');
const logoutBtn = document.getElementById('logout-btn');
const adminVehiculosList = document.getElementById('admin-vehiculos-list');

// Mostrar modal de login
document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.remove('hidden');
});

// Ocultar modal
closeModalBtn.addEventListener('click', function() {
    loginModal.classList.add('hidden');
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});

// Manejar login de administrador
adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    if (email === adminCredentials.email && password === adminCredentials.password) {
        adminLoggedIn = true;
        loginModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        cargarVehiculosParaAdmin();
        adminLoginForm.reset();
    } else {
        alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', function() {
    adminLoggedIn = false;
    adminPanel.classList.add('hidden');
});

// Cargar vehículos en el panel de administración
function cargarVehiculosParaAdmin() {
    adminVehiculosList.innerHTML = '';
    
    vehiculos.forEach(vehiculo => {
        const vehiculoItem = document.createElement('div');
        vehiculoItem.className = 'admin-vehiculo-item';
        
        vehiculoItem.innerHTML = `
            <h4>${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})</h4>
            <p><strong>Precio:</strong> $${vehiculo.precio.toLocaleString()}</p>
            <p><strong>ID:</strong> ${vehiculo.id}</p>
            <p><strong>Destacado:</strong> ${vehiculo.destacado ? 'Sí' : 'No'}</p>
            <div class="admin-vehiculo-actions">
                <button class="edit-btn" data-id="${vehiculo.id}">Editar</button>
                <button class="delete-btn" data-id="${vehiculo.id}">Eliminar</button>
                <button class="feature-btn" data-id="${vehiculo.id}">
                    ${vehiculo.destacado ? 'Quitar destacado' : 'Destacar'}
                </button>
            </div>
        `;
        
        adminVehiculosList.appendChild(vehiculoItem);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editarVehiculo(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            if (confirm('¿Está seguro de que desea eliminar este vehículo?')) {
                eliminarVehiculo(id);
            }
        });
    });
    
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            toggleDestacado(id);
        });
    });
}

// Funciones de administración
function editarVehiculo(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo) {
        // En un sistema real, abrirías un formulario de edición
        alert(`Editar vehículo ID: ${id}\n\nEsta funcionalidad se implementaría completamente en una versión futura.`);
    }
}

function eliminarVehiculo(id) {
    const index = vehiculos.findIndex(v => v.id === id);
    if (index !== -1) {
        vehiculos.splice(index, 1);
        cargarVehiculosParaAdmin();
        mostrarVehiculos(vehiculos.filter(v => v.destacado));
        alert('Vehículo eliminado correctamente.');
    }
}

function toggleDestacado(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo) {
        vehiculo.destacado = !vehiculo.destacado;
        cargarVehiculosParaAdmin();
        mostrarVehiculos(vehiculos.filter(v => v.destacado));
    }
}

    // Datos de ejemplo de vehículos
    const vehiculos = [
        {
            id: 1,
            marca: "Toyota",
            modelo: "Corolla",
            año: 2020,
            precio: 18000,
            imagen: "https://example.com/toyota-corolla.jpg",
            destacado: true
        },
        {
            id: 2,
            marca: "Ford",
            modelo: "F-150",
            año: 2018,
            precio: 25000,
            imagen: "https://example.com/ford-f150.jpg",
            destacado: true
        },
        {
            id: 3,
            marca: "Chevrolet",
            modelo: "Cruze",
            año: 2019,
            precio: 16500,
            imagen: "https://example.com/chevrolet-cruze.jpg",
            destacado: true
        }
    ];

    // Elementos del DOM
    const vehiculosContainer = document.getElementById('vehiculos-container');
    const venderForm = document.getElementById('vender-form');
    const formularioVender = document.getElementById('formulario-vender');
    const venderBtn = document.querySelector('a[href="#vender"]');
    const searchBtn = document.getElementById('search-btn');
    const marcaSelect = document.getElementById('marca');
    const precioSelect = document.getElementById('precio');
    const searchInput = document.querySelector('#buscador input');

    // Mostrar vehículos en el grid
    function mostrarVehiculos(vehiculosMostrar) {
        vehiculosContainer.innerHTML = '';
        
        vehiculosMostrar.forEach(vehiculo => {
            const vehiculoCard = document.createElement('div');
            vehiculoCard.className = 'vehiculo-card';
            
            vehiculoCard.innerHTML = `
                <img src="${vehiculo.imagen || 'https://via.placeholder.com/300x200?text=Sin+imagen'}" alt="${vehiculo.marca} ${vehiculo.modelo}" class="vehiculo-img">
                <div class="vehiculo-info">
                    <h3>${vehiculo.marca} ${vehiculo.modelo}</h3>
                    <p>Año: ${vehiculo.año}</p>
                    <p class="precio">$${vehiculo.precio.toLocaleString()}</p>
                    <div class="vehiculo-actions">
                        <button class="detalles-btn">Ver Detalles</button>
                        <button class="contactar-btn">Contactar</button>
                    </div>
                </div>
            `;
            
            vehiculosContainer.appendChild(vehiculoCard);
        });
    }

    // Mostrar vehículos destacados al cargar la página
    const vehiculosDestacados = vehiculos.filter(v => v.destacado);
    mostrarVehiculos(vehiculosDestacados);

    // Manejar el formulario de venta
    venderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        formularioVender.classList.toggle('hidden');
    });

    venderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nuevoVehiculo = {
            id: vehiculos.length + 1,
            marca: document.getElementById('marca-vehiculo').value,
            modelo: document.getElementById('modelo-vehiculo').value,
            año: parseInt(document.getElementById('ano-vehiculo').value),
            precio: parseFloat(document.getElementById('precio-vehiculo').value),
            imagen: document.getElementById('imagen-vehiculo').value,
            destacado: false
        };
        
        vehiculos.push(nuevoVehiculo);
        mostrarVehiculos(vehiculosDestacados);
        venderForm.reset();
        formularioVender.classList.add('hidden');
        
        alert('¡Vehículo publicado con éxito!');
    });

    // Manejar la búsqueda
    searchBtn.addEventListener('click', function() {
        const marca = marcaSelect.value.toLowerCase();
        const precio = precioSelect.value;
        const texto = searchInput.value.toLowerCase();
        
        let resultados = vehiculos;
        
        // Filtrar por marca
        if (marca) {
            resultados = resultados.filter(v => v.marca.toLowerCase().includes(marca));
        }
        
        // Filtrar por precio
        if (precio) {
            const [min, max] = precio.split('-').map(Number);
            resultados = resultados.filter(v => v.precio >= min && v.precio <= max);
        }
        
        // Filtrar por texto
        if (texto) {
            resultados = resultados.filter(v => 
                v.marca.toLowerCase().includes(texto) || 
                v.modelo.toLowerCase().includes(texto)
            );
        }
        
        mostrarVehiculos(resultados);
    });

    // Simular login/register (funcionalidad básica)
    document.getElementById('login-btn').addEventListener('click', function() {
        alert('Funcionalidad de login en desarrollo');
    });

    document.getElementById('register-btn').addEventListener('click', function() {
        alert('Funcionalidad de registro en desarrollo');
    });
});