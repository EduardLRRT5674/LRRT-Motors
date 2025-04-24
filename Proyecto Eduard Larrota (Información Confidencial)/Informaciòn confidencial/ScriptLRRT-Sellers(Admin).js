document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

    // Modal functionality
    const newSellerBtn = document.getElementById('new-seller-btn');
    const newSellerModal = document.getElementById('new-seller-modal');
    const sellerDetailModal = document.getElementById('seller-detail-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const viewBtns = document.querySelectorAll('.btn-view');
    
    // Open new seller modal
    if (newSellerBtn) {
        newSellerBtn.addEventListener('click', function() {
            newSellerModal.style.display = 'block';
            // Set default date to today
            document.getElementById('hire-date').valueAsDate = new Date();
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            newSellerModal.style.display = 'none';
            sellerDetailModal.style.display = 'none';
        });
    });
    
    // Open seller detail modal
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sellerDetailModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === newSellerModal) {
            newSellerModal.style.display = 'none';
        }
        if (e.target === sellerDetailModal) {
            sellerDetailModal.style.display = 'none';
        }
    });
    
    // Handle form submission
    const newSellerForm = document.getElementById('new-seller-form');
    if (newSellerForm) {
        newSellerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                position: document.getElementById('position').value,
                commission: document.getElementById('commission').value,
                hireDate: document.getElementById('hire-date').value,
                status: document.getElementById('status').value,
                address: document.getElementById('address').value,
                notes: document.getElementById('notes').value
            };
            
            // Validate data
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
                !formData.position || !formData.commission || !formData.hireDate || !formData.status) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // In a real app, you would send this to the server
            console.log('New seller data:', formData);
            
            // Show success message
            alert('Vendedor registrado correctamente');
            
            // Close modal and reset form
            newSellerModal.style.display = 'none';
            newSellerForm.reset();
            
            // In a real app, you would refresh the sellers table here
        });
    }
    
    // Handle status filter
    const statusFilter = document.getElementById('seller-status');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            console.log('Filtering by status:', status);
            
            // In a real app, you would filter the sellers data here
        });
    }
    
    // Handle performance filter
    const performanceFilter = document.getElementById('performance');
    if (performanceFilter) {
        performanceFilter.addEventListener('change', function() {
            const performance = this.value;
            console.log('Filtering by performance:', performance);
            
            // In a real app, you would filter the sellers data here
        });
    }
    
    // Handle search
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                console.log('Searching for:', searchTerm);
                
                // In a real app, you would search the sellers data here
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
            console.log('Exporting sellers data');
            // In a real app, you would generate an Excel/CSV file here
            alert('Datos de vendedores exportados correctamente');
        });
    }
    
    // Handle tabs in seller detail
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabBtns.forEach(tb => tb.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Make table responsive
    function makeTableResponsive() {
        if (window.innerWidth <= 768) {
            const table = document.querySelector('.sellers-table');
            if (table) {
                const headers = [];
                document.querySelectorAll('.sellers-table thead th').forEach(header => {
                    headers.push(header.textContent);
                });
                
                document.querySelectorAll('.sellers-table tbody tr').forEach(row => {
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell, index) => {
                        cell.setAttribute('data-label', headers[index]);
                    });
                });
            }
        }
    }
    
    window.addEventListener('resize', makeTableResponsive);
    makeTableResponsive();
});