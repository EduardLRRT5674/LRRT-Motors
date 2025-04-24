document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        clearErrors();
        
        // Validar campos
        if (validateForm()) {
            // Obtener los datos del formulario
            const userData = {
                nombres: document.getElementById('nombres').value.trim(),
                apellidos: document.getElementById('apellidos').value.trim(),
                tipoIdentificacion: document.getElementById('tipoIdentificacion').value,
                numeroIdentificacion: document.getElementById('numeroIdentificacion').value.trim(),
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                sexo: document.getElementById('sexo').value,
                estadoCivil: document.getElementById('estadoCivil').value,
                nivelEstudios: document.getElementById('nivelEstudios').value,
                ocupacion: document.getElementById('ocupacion').value.trim(),
                antiguedad: document.getElementById('antiguedad').value,
                ingresos: document.getElementById('ingresos').value,
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                usuario: document.getElementById('usuario').value.trim(),
                password: document.getElementById('password').value
            };
            
            // Aquí normalmente enviarías los datos al servidor
            console.log('Datos del usuario:', userData);
            
            // Mostrar mensaje de éxito
            showSuccess('Registro exitoso. Redirigiendo...');
            
            // Simular envío al servidor
            setTimeout(() => {
                registroForm.reset();
                // window.location.href = 'bienvenida.html';
            }, 2000);
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Validar campos requeridos
        const requiredFields = [
            'nombres', 'apellidos', 'tipoIdentificacion', 'numeroIdentificacion',
            'fechaNacimiento', 'sexo', 'estadoCivil', 'nivelEstudios', 'ocupacion',
            'email', 'telefono', 'usuario', 'password', 'confirmPassword'
        ];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                showError(field, 'Este campo es obligatorio');
                isValid = false;
            }
        });
        
        // Validar formato de email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            showError(email, 'Ingrese un correo electrónico válido');
            isValid = false;
        }
        
        // Validar contraseña
        const password = document.getElementById('password');
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password.value && !passwordRegex.test(password.value)) {
            showError(password, 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, números y símbolos');
            isValid = false;
        }
        
        // Validar confirmación de contraseña
        const confirmPassword = document.getElementById('confirmPassword');
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Las contraseñas no coinciden');
            isValid = false;
        }
        
        // Validar fecha de nacimiento (mayor de 18 años)
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        if (fechaNacimiento.value) {
            const birthDate = new Date(fechaNacimiento.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18) {
                showError(fechaNacimiento, 'Debes tener al menos 18 años para registrarte');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.textContent = message;
        
        // Insertar después del campo
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        
        // Resaltar el campo con error
        field.style.borderColor = 'var(--error-color)';
    }
    
    function clearErrors() {
        // Eliminar todos los mensajes de error
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        // Restablecer bordes de los campos
        document.querySelectorAll('input, select').forEach(field => {
            field.style.borderColor = '';
        });
    }
    
    function showSuccess(message) {
        // Eliminar mensajes previos
        const prevMessage = document.querySelector('.success');
        if (prevMessage) prevMessage.remove();
        
        // Crear mensaje de éxito
        const successElement = document.createElement('div');
        successElement.className = 'success';
        successElement.textContent = message;
        
        // Insertar antes del botón de envío
        const submitButton = document.querySelector('.btn-registro');
        submitButton.parentNode.insertBefore(successElement, submitButton);
    }
});