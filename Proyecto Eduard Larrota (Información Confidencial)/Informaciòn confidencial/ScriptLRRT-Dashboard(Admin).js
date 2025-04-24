document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
    
    // Mobile menu toggle
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }
    
    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu();
    
    // Simulate adding a new vehicle (demo purposes)
    const addVehicleBtn = document.querySelector('.btn-add-vehicle');
    const addVehicleForm = document.getElementById('add-vehicle-form');
    const closeFormBtn = document.querySelector('.close-form');
    const cancelFormBtn = document.querySelector('.btn-cancel');
    
    if (addVehicleBtn && addVehicleForm) {
        addVehicleBtn.addEventListener('click', function() {
            addVehicleForm.style.display = 'flex';
        });
        
        closeFormBtn.addEventListener('click', function() {
            addVehicleForm.style.display = 'none';
        });
        
        cancelFormBtn.addEventListener('click', function() {
            addVehicleForm.style.display = 'none';
        });
    }
    
    // Form submission
    const vehicleForm = document.getElementById('vehicle-form');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const make = document.getElementById('make').value;
            const model = document.getElementById('model').value;
            const year = document.getElementById('year').value;
            const price = document.getElementById('price').value;
            const stock = document.getElementById('stock').value;
            
            // In a real app, you would send this data to the server
            console.log('Nuevo vehículo:', {
                make, model, year, price, stock
            });
            
            // Show success message
            alert('Vehículo agregado correctamente');
            
            // Reset form and hide it
            vehicleForm.reset();
            addVehicleForm.style.display = 'none';
            
            // In a real app, you would update the vehicle list here
        });
    }
    
    // Navigation active state
    const navLinks = document.querySelectorAll('.admin-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Demo data for charts (in a real app, you would use a library like Chart.js)
    function initCharts() {
        console.log('Inicializando gráficos...');
        // Aquí iría el código para inicializar gráficos con una biblioteca como Chart.js
    }
    
    initCharts();
    
    // Simulate loading data
    setTimeout(() => {
        console.log('Datos cargados');
    }, 1000);
});