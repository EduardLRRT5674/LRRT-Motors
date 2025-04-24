document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const loginContainer = document.querySelector('.login-container');
    const adminPanel = document.getElementById('adminPanel');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminNameSpan = document.getElementById('adminName');
    
    // Credenciales válidas (en producción esto estaría en el backend)
    const validCredentials = {
        username: 'admin',
        password: 'AutoMarket2023!',
        name: 'Administrador Principal'
    };
    
    // Mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        this.setAttribute('aria-label', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
    
    // Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetear errores
        document.getElementById('username-error').textContent = '';
        document.getElementById('password-error').textContent = '';
        
        // Validar campos
        let isValid = true;
        
        if (usernameInput.value.trim() === '') {
            document.getElementById('username-error').textContent = 'El usuario es requerido';
            isValid = false;
        }
        
        if (passwordInput.value.trim() === '') {
            document.getElementById('password-error').textContent = 'La contraseña es requerida';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simular autenticación (en producción sería una petición AJAX)
        if (usernameInput.value === validCredentials.username && 
            passwordInput.value === validCredentials.password) {
            
            // Simular inicio de sesión exitoso
            loginSuccess();
        } else {
            // Mostrar error genérico (por seguridad no especificar qué falló)
            document.getElementById('password-error').textContent = 'Credenciales incorrectas';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    // Función de login exitoso
    function loginSuccess() {
        // Guardar estado de sesión (en producción usaríamos tokens/JWT)
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminName', validCredentials.name);
        
        // Ocultar formulario y mostrar panel
        loginContainer.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        
        // Mostrar nombre del admin
        adminNameSpan.textContent = validCredentials.name;
        
        // Cargar datos del dashboard
        loadDashboardData();
    }
    
    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
        // Limpiar sesión
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminName');
        
        // Mostrar formulario y ocultar panel
        adminPanel.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        
        // Resetear formulario
        loginForm.reset();
    });
    
    // Cargar datos del dashboard
    function loadDashboardData() {
        // Simular carga de datos (en producción sería una petición AJAX)
        setTimeout(() => {
            document.getElementById('totalVehicles').textContent = '247';
            document.getElementById('activeUsers').textContent = '1,843';
            document.getElementById('todaySales').textContent = '12';
        }, 800);
    }
    
    // Verificar si ya está logueado al cargar la página
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
        const name = sessionStorage.getItem('adminName');
        
        if (isLoggedIn) {
            loginContainer.classList.add('hidden');
            adminPanel.classList.remove('hidden');
            adminNameSpan.textContent = name || 'Administrador';
            loadDashboardData();
        }
    }
    
    // Ejecutar verificación al cargar
    checkLoginStatus();
});