document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const rol = document.getElementById('rol').value;
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar contraseña (mínimo 12 caracteres, con símbolos/números)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña debe tener al menos 12 caracteres, una mayúscula, un número y un símbolo.');
        return;
    }

    // Validar confirmación
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Ingrese un correo electrónico válido.');
        return;
    }

    // Validar teléfono (ejemplo: mínimo 8 dígitos)
    if (telefono.length < 8 || !/^\d+$/.test(telefono)) {
        alert('Ingrese un número de teléfono válido.');
        return;
    }

    // Si todo está correcto, enviar datos (simulado)
    const adminData = {
        nombres,
        apellidos,
        email,
        telefono,
        rol,
        usuario,
        password // En un caso real, esto debería encriptarse antes de enviar.
    };

    console.log('Datos del administrador:', adminData);
    alert('Registro exitoso. Datos guardados (consola).');
});