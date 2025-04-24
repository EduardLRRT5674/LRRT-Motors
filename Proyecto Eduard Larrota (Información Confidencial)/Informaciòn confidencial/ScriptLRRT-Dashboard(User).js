document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const editProfileBtn = document.querySelector('.btn-edit-profile');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelEditBtn = document.querySelector('.cancel-edit');
    const profileForm = document.getElementById('profile-form');
    const profilePhotoInput = document.getElementById('profile-photo');
    const profilePhotoPreview = document.getElementById('profile-photo-preview');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const favoriteBtns = document.querySelectorAll('.favorite-btn');

    // Toggle menú hamburguesa
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Toggle dropdown de usuario
    userDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownContent.classList.toggle('active');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function() {
        dropdownContent.classList.remove('active');
    });

    // Mostrar modal de edición de perfil
    editProfileBtn.addEventListener('click', function() {
        editProfileModal.style.display = 'block';
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        editProfileModal.style.display = 'none';
    });

    cancelEditBtn.addEventListener('click', function() {
        editProfileModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    // Previsualizar foto de perfil
    profilePhotoInput.addEventListener('change', function() {
        profilePhotoPreview.innerHTML = '';
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.style.backgroundImage = `url('${e.target.result}')`;
                
                const removeBtn = document.createElement('span');
                removeBtn.className = 'remove-img';
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', function() {
                    previewItem.remove();
                    profilePhotoInput.value = '';
                });
                
                previewItem.appendChild(removeBtn);
                profilePhotoPreview.appendChild(previewItem);
            }
            reader.readAsDataURL(file);
        }
    });

    // Eliminar foto de perfil existente
    document.querySelector('.remove-img').addEventListener('click', function() {
        this.parentElement.remove();
        // Aquí deberías también eliminar la foto del servidor
    });

    // Enviar formulario de perfil
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría la lógica para guardar los cambios en el servidor
        alert('Perfil actualizado correctamente');
        editProfileModal.style.display = 'none';
        
        // Actualizar la información en la página
        document.querySelector('.user-profile h3').textContent = 
            `${document.getElementById('first-name').value} ${document.getElementById('last-name').value.split(' ')[0]}`;
    });

    // Toggle favoritos
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            
            // Aquí iría la lógica para guardar/eliminar de favoritos en el servidor
            const vehicleId = this.closest('.vehicle-card').dataset.id;
            const isFavorite = this.classList.contains('active');
            
            console.log(`Vehículo ${vehicleId} ${isFavorite ? 'agregado a' : 'eliminado de'} favoritos`);
        });
    });

    // Eventos para tarjetas de vehículos
    vehicleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar que el clic se active cuando se hace clic en botones dentro de la tarjeta
            if (!e.target.closest('.btn-action') && !e.target.closest('.favorite-btn')) {
                const vehicleId = this.dataset.id;
                window.location.href = `detalle-vehiculo.html?id=${vehicleId}`;
            }
        });
    });

    // Botones de acción en vehículos
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const vehicleId = this.closest('.vehicle-card').dataset.id;
            window.location.href = `detalle-vehiculo.html?id=${vehicleId}`;
        });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const vehicleId = this.closest('.vehicle-card').dataset.id;
            window.location.href = `editar-vehiculo.html?id=${vehicleId}`;
        });
    });

    document.querySelectorAll('.btn-contact').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const sellerId = this.closest('.vehicle-card').dataset.seller;
            window.location.href = `mensajes.html?user=${sellerId}`;
        });
    });
});