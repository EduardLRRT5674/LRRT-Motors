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
        // Sales Chart
        const salesCtx = document.getElementById('sales-chart').getContext('2d');
        const salesChart = new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    label: 'Ventas',
                    data: [10, 15, 12, 11],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
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
                        beginAtZero: true
                    }
                }
            }
        });
        
        // Inventory Chart
        const inventoryCtx = document.getElementById('inventory-chart').getContext('2d');
        const inventoryChart = new Chart(inventoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Disponibles', 'Reservados', 'Vendidos'],
                datasets: [{
                    data: [85, 15, 25],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
        
        // Vehicle Types Chart
        const vehicleTypesCtx = document.getElementById('vehicle-types-chart').getContext('2d');
        const vehicleTypesChart = new Chart(vehicleTypesCtx, {
            type: 'pie',
            data: {
                labels: ['Sedán', 'SUV', 'Pickup', 'Hatchback', 'Otros'],
                datasets: [{
                    data: [35, 45, 15, 20, 10],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    initCharts();

    // Handle custom date fields
    const timePeriodSelect = document.getElementById('time-period');
    const customDateFields = document.querySelectorAll('.custom-date');
    
    if (timePeriodSelect) {
        timePeriodSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customDateFields.forEach(field => field.style.display = 'block');
            } else {
                customDateFields.forEach(field => field.style.display = 'none');
            }
        });
    }
    
    // Handle report generation
    const generateBtn = document.querySelector('.btn-generate');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const reportType = document.getElementById('report-type').value;
            const timePeriod = document.getElementById('time-period').value;
            
            let startDate, endDate;
            if (timePeriod === 'custom') {
                startDate = document.getElementById('start-date').value;
                endDate = document.getElementById('end-date').value;
                
                if (!startDate || !endDate) {
                    alert('Por favor seleccione un rango de fechas completo');
                    return;
                }
            }
            
            console.log('Generating report:', {
                reportType,
                timePeriod,
                startDate,
                endDate
            });
            
            // In a real app, you would fetch the report data here
        });
    }
    
    // Handle export
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const reportType = document.getElementById('report-type').value;
            console.log('Exporting report:', reportType);
            
            // In a real app, you would generate the export file here
            alert('Reporte exportado correctamente');
        });
    }
    
    // Handle custom report configuration modal
    const configModal = document.getElementById('report-config-modal');
    const customPeriodFields = document.querySelector('.custom-date-fields');
    
    // Show modal (this would be triggered by a button in a real app)
    // document.getElementById('config-btn').addEventListener('click', function() {
    //     configModal.style.display = 'block';
    // });
    
    // Close modal
    document.querySelectorAll('.close-modal, .btn-cancel').forEach(btn => {
        btn.addEventListener('click', function() {
            configModal.style.display = 'none';
        });
    });
    
    // Handle custom period selection
    const customPeriodSelect = document.getElementById('custom-period');
    if (customPeriodSelect) {
        customPeriodSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customPeriodFields.style.display = 'flex';
            } else {
                customPeriodFields.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    const configForm = document.getElementById('report-config-form');
    if (configForm) {
        configForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                reportType: document.getElementById('custom-report-type').value,
                period: document.getElementById('custom-period').value,
                startDate: document.getElementById('custom-start-date').value,
                endDate: document.getElementById('custom-end-date').value,
                format: document.getElementById('report-format').value,
                details: Array.from(document.querySelectorAll('input[name="details"]:checked')).map(el => el.value)
            };
            
            console.log('Generating custom report:', formData);
            
            // In a real app, you would generate the custom report here
            
            configModal.style.display = 'none';
            alert('Reporte personalizado generado correctamente');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === configModal) {
            configModal.style.display = 'none';
        }
    });
});