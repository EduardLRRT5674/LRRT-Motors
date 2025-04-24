document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Limpiar mensajes de error anteriores
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    
    // Obtener valores
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validaciones
    let isValid = true;
    
    if (username === '') {
        document.getElementById('usernameError').textContent = 'El usuario es requerido';
        isValid = false;
    } else if (username.length < 4) {
        document.getElementById('usernameError').textContent = 'El usuario debe tener al menos 4 caracteres';
        isValid = false;
    }
    
    if (password === '') {
        document.getElementById('passwordError').textContent = 'La contraseña es requerida';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 6 caracteres';
        isValid = false;
    }
    
    // Si todo es válido, simular envío
    if (isValid) {
        // Aquí normalmente harías una petición AJAX o fetch a tu backend
        console.log('Datos válidos:', { username, password });
        
        // Simular éxito (en un caso real, esto dependería de la respuesta del servidor)
        alert('Inicio de sesión exitoso! Redirigiendo...');
        // window.location.href = 'dashboard.html'; // Redirigir al dashboard
    }
});

// Efecto visual para los inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('label').style.color = '#667eea';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('label').style.color = '#555';
    });
});