document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

    // Initialize charts
    function initCharts() {
        // Monthly Sales Chart
        const monthlySalesCtx = document.getElementById('monthly-sales-chart').getContext('2d');
        const monthlySalesChart = new Chart(monthlySalesCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: '2023',
                        data: [32000, 28000, 35000, 40000, 42000, 48000, 0, 0, 0, 0, 0, 0],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '2022',
                        data: [25000, 27000, 30000, 32000, 35000, 38000, 40000, 42000, 38000, 35000, 32000, 40000],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
        // Sales by Seller Chart
        const salesBySellerCtx = document.getElementById('sales-by-seller-chart').getContext('2d');
        const salesBySellerChart = new Chart(salesBySellerCtx, {
            type: 'bar',
            data: {
                labels: ['María González', 'Carlos Rodríguez', 'Ana Martínez', 'Luis Fernández'],
                datasets: [{
                    label: 'Ventas',
                    data: [18, 12, 8, 5],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(155, 89, 182, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(155, 89, 182, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + (value === 1 ? ' venta' : ' ventas');
                            }
                        }
                    }
                }
            }
        });
    }
    
    initCharts();

    // Modal functionality
    const newSaleBtn = document.getElementById('new-sale-btn');
    const newSaleModal = document.getElementById('new-sale-modal');
    const saleDetailModal = document.getElementById('sale-detail-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const viewBtns = document.querySelectorAll('.btn-view');
    
    // Open new sale modal
    if (newSaleBtn) {
        newSaleBtn.addEventListener('click', function() {
            newSaleModal.style.display = 'block';
            // Set default date to today
            document.getElementById('sale-date').valueAsDate = new Date();
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            newSaleModal.style.display = 'none';
            saleDetailModal.style.display = 'none';
        });
    });
    
    // Open sale detail modal
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            saleDetailModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === newSaleModal) {
            newSaleModal.style.display = 'none';
        }
        if (e.target === saleDetailModal) {
            saleDetailModal.style.display = 'none';
        }
    });
    
    // Handle vehicle selection to auto-fill price
    const vehicleSelect = document.getElementById('vehicle');
    if (vehicleSelect) {
        vehicleSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value && selectedOption.text.includes('$')) {
                const price = selectedOption.text.split('$')[1].replace(',', '');
                document.getElementById('price').value = price;
            }
        });
    }
    
    // Handle form submission
    const newSaleForm = document.getElementById('new-sale-form');
    if (newSaleForm) {
        newSaleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                client: document.getElementById('client').value,
                seller: document.getElementById('seller').value,
                vehicle: document.getElementById('vehicle').value,
                date: document.getElementById('sale-date').value,
                price: document.getElementById('price').value,
                paymentMethod: document.getElementById('payment-method').value,
                status: document.getElementById('status').value,
                notes: document.getElementById('notes').value
            };
            
            // Validate data
            if (!formData.client || !formData.seller || !formData.vehicle || !formData.date || !formData.price) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // In a real app, you would send this to the server
            console.log('New sale data:', formData);
            
            // Show success message
            alert('Venta registrada correctamente');
            
            // Close modal and reset form
            newSaleModal.style.display = 'none';
            newSaleForm.reset();
            
            // In a real app, you would refresh the sales table here
        });
    }
    
    // Handle date filter
    const applyDateBtn = document.querySelector('.btn-apply');
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', function() {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            if (!startDate || !endDate) {
                alert('Por favor seleccione un rango de fechas completo');
                return;
            }
            
            console.log('Filtering by date range:', startDate, 'to', endDate);
            
            // In a real app, you would filter the sales data here
        });
    }
    
    // Handle status filter
    const statusFilter = document.getElementById('sale-status');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            console.log('Filtering by status:', status);
            
            // In a real app, you would filter the sales data here
        });
    }
    
    // Handle search
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                console.log('Searching for:', searchTerm);
                
                // In a real app, you would search the sales data here
            }
        });
    }
    
    // Handle pagination
    const pageBtns = document.querySelectorAll('.page-btn:not(.disabled)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            const page = this.textContent;
            console.log('Changing to page:', page);
            
            // In a real app, you would load the selected page of data here
        });
    });
    
    // Handle export
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('Exporting sales data');
            // In a real app, you would generate an Excel/CSV file here
            alert('Datos de ventas exportados correctamente');
        });
    }
});