document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
    
    // Vehicle Modal
    const addVehicleBtn = document.getElementById('add-vehicle-btn');
    const vehicleModal = document.getElementById('vehicle-modal');
    const closeModalBtns = document.querySelectorAll('.close-form, .btn-cancel');
    const confirmModal = document.getElementById('confirm-modal');
    const deleteBtns = document.querySelectorAll('.btn-delete');
    const closeConfirmBtns = document.querySelectorAll('.close-confirm, .btn-cancel-delete');
    const confirmDeleteBtn = document.querySelector('.btn-confirm-delete');
    
    // Abrir modal para agregar vehículo
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', function() {
            document.getElementById('modal-title').textContent = 'Agregar Nuevo Vehículo';
            vehicleModal.style.display = 'flex';
        });
    }
    
    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            vehicleModal.style.display = 'none';
        });
    });
    
    closeConfirmBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            confirmModal.style.display = 'none';
        });
    });
    
    // Manejar clic en botones de eliminar
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            confirmModal.style.display = 'flex';
            // Aquí podrías guardar el ID del vehículo a eliminar
        });
    });
    
    // Confirmar eliminación
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            // Aquí iría el código para eliminar el vehículo
            console.log('Vehículo eliminado');
            confirmModal.style.display = 'none';
            
            // Mostrar mensaje de éxito
            alert('Vehículo eliminado correctamente');
            
            // En una aplicación real, actualizarías la tabla aquí
        });
    }
    
    // Manejar edición de vehículos
    const editBtns = document.querySelectorAll('.btn-edit');
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('modal-title').textContent = 'Editar Vehículo';
            
            // Aquí podrías cargar los datos del vehículo en el formulario
            // Ejemplo con datos estáticos para demostración:
            document.getElementById('vehicle-make').value = 'toyota';
            document.getElementById('vehicle-model').value = 'Corolla';
            document.getElementById('vehicle-year').value = '2022';
            document.getElementById('vehicle-price').value = '25000';
            document.getElementById('vehicle-type').value = 'sedan';
            document.getElementById('vehicle-transmission').value = 'automatic';
            document.getElementById('vehicle-mileage').value = '15000';
            document.getElementById('vehicle-color').value = 'Blanco';
            document.getElementById('vehicle-stock').value = '5';
            document.getElementById('vehicle-status').value = 'available';
            document.getElementById('vehicle-description').value = 'Toyota Corolla 2022 en excelente estado, baja kilometraje.';
            
            vehicleModal.style.display = 'flex';
        });
    });
    
    // Manejar envío del formulario
    const vehicleForm = document.getElementById('vehicle-form');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = {
                make: document.getElementById('vehicle-make').value,
                model: document.getElementById('vehicle-model').value,
                year: document.getElementById('vehicle-year').value,
                price: document.getElementById('vehicle-price').value,
                type: document.getElementById('vehicle-type').value,
                transmission: document.getElementById('vehicle-transmission').value,
                mileage: document.getElementById('vehicle-mileage').value,
                color: document.getElementById('vehicle-color').value,
                stock: document.getElementById('vehicle-stock').value,
                status: document.getElementById('vehicle-status').value,
                description: document.getElementById('vehicle-description').value
            };
            
            // Validar datos (ejemplo básico)
            if (!formData.make || !formData.model || !formData.year || !formData.price) {
                alert('Por favor complete los campos requeridos');
                return;
            }
            
            // En una aplicación real, aquí enviarías los datos al servidor
            console.log('Datos del vehículo:', formData);
            
            // Mostrar mensaje de éxito
            const isEdit = document.getElementById('modal-title').textContent.includes('Editar');
            alert(`Vehículo ${isEdit ? 'actualizado' : 'agregado'} correctamente`);
            
            // Cerrar modal y limpiar formulario
            vehicleModal.style.display = 'none';
            vehicleForm.reset();
            
            // En una aplicación real, actualizarías la tabla aquí
        });
    }
    
    // Manejar búsqueda
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                console.log('Buscando:', searchTerm);
                
                // En una aplicación real, aquí harías una petición al servidor
                // o filtrarías los datos localmente
            }
        });
    }
    
    // Manejar filtro por estado
    const statusFilter = document.querySelector('.filter-dropdown select');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            console.log('Filtrar por estado:', status);
            
            // En una aplicación real, aquí actualizarías la tabla
        });
    }
    
    // Manejar paginación
    const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            console.log('Cambiar a página:', this.textContent);
            
            // En una aplicación real, aquí cargarías los datos de la página seleccionada
        });
    });
});