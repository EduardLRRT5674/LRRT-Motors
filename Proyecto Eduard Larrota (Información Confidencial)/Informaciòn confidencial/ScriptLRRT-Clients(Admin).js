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
    const newClientBtn = document.getElementById('new-client-btn');
    const newClientModal = document.getElementById('new-client-modal');
    const clientDetailModal = document.getElementById('client-detail-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const viewBtns = document.querySelectorAll('.btn-view');
    
    // Open new client modal
    if (newClientBtn) {
        newClientBtn.addEventListener('click', function() {
            newClientModal.style.display = 'block';
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            newClientModal.style.display = 'none';
            clientDetailModal.style.display = 'none';
        });
    });
    
    // Open client detail modal
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            clientDetailModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === newClientModal) {
            newClientModal.style.display = 'none';
        }
        if (e.target === clientDetailModal) {
            clientDetailModal.style.display = 'none';
        }
    });
    
    // Handle client type change to show/hide company fields
    const clientTypeSelect = document.getElementById('client-type');
    if (clientTypeSelect) {
        clientTypeSelect.addEventListener('change', function() {
            const companyFields = document.querySelector('.company-fields');
            if (this.value === 'business') {
                companyFields.style.display = 'flex';
            } else {
                companyFields.style.display = 'none';
            }
        });
    }
    
    // Handle form submission
    const newClientForm = document.getElementById('new-client-form');
    if (newClientForm) {
        newClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                type: document.getElementById('client-type').value,
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                companyName: document.getElementById('company-name').value,
                companyPosition: document.getElementById('company-position').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                status: document.getElementById('status').value,
                source: document.getElementById('source').value,
                notes: document.getElementById('notes').value
            };
            
            // Validate data
            if (!formData.type || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // In a real app, you would send this to the server
            console.log('New client data:', formData);
            
            // Show success message
            alert('Cliente registrado correctamente');
            
            // Close modal and reset form
            newClientModal.style.display = 'none';
            newClientForm.reset();
            
            // In a real app, you would refresh the clients table here
        });
    }
    
    // Handle status filter
    const statusFilter = document.getElementById('client-status');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            console.log('Filtering by status:', status);
            
            // In a real app, you would filter the clients data here
        });
    }
    
    // Handle type filter
    const typeFilter = document.getElementById('client-type');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            const type = this.value;
            console.log('Filtering by type:', type);
            
            // In a real app, you would filter the clients data here
        });
    }
    
    // Handle search
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                console.log('Searching for:', searchTerm);
                
                // In a real app, you would search the clients data here
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
            console.log('Exporting clients data');
            // In a real app, you would generate an Excel/CSV file here
            alert('Datos de clientes exportados correctamente');
        });
    }
    
    // Handle tabs in client detail
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
});