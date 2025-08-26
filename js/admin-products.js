// Admin Products JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Edit product functionality
    const editProductButtons = document.querySelectorAll('.edit-product');
    editProductButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const productName = row.cells[0].textContent;
            const unit = row.cells[1].textContent;
            const price = row.cells[2].textContent;
            const status = row.cells[3].textContent.trim();
            
            // Create a modal for editing a product
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Product</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="productName">Product Name:</label>
                            <input type="text" id="productName" value="${productName}">
                        </div>
                        <div class="form-group">
                            <label for="productUnit">Unit:</label>
                            <input type="text" id="productUnit" value="${unit}">
                        </div>
                        <div class="form-group">
                            <label for="productPrice">Price (TZS):</label>
                            <input type="number" id="productPrice" value="${price.replace(/,/g, '')}">
                        </div>
                        <div class="form-group">
                            <label for="productStatus">Status:</label>
                            <select id="productStatus">
                                <option value="active" ${status.includes('Active') ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${status.includes('Inactive') ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn cancel-btn">Cancel</button>
                        <button class="action-btn update-btn">Update Product</button>
                    </div>
                </div>
            `;
            
            // Add modal to document
            document.body.appendChild(modal);
            
            // Show modal
            modal.style.display = 'block';
            
            // Close modal events
            const closeModal = modal.querySelector('.close-modal');
            const cancelBtn = modal.querySelector('.cancel-btn');
            
            const closeModalFunction = function() {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            };
            
            closeModal.addEventListener('click', closeModalFunction);
            cancelBtn.addEventListener('click', closeModalFunction);
            
            // Update product
            const updateBtn = modal.querySelector('.update-btn');
            updateBtn.addEventListener('click', function() {
                const name = modal.querySelector('#productName').value;
                const unit = modal.querySelector('#productUnit').value;
                const price = modal.querySelector('#productPrice').value;
                const status = modal.querySelector('#productStatus').value;
                
                // In a real application, this would make an API call to update the product
                // For now, we'll just update the UI
                row.cells[0].textContent = name;
                row.cells[1].textContent = unit;
                row.cells[2].textContent = parseFloat(price).toLocaleString('en-TZ', { minimumFractionDigits: 2 });
                
                const statusCell = row.cells[3];
                statusCell.innerHTML = '';
                
                const statusBadge = document.createElement('span');
                statusBadge.className = `status-badge ${status}`;
                statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
                statusCell.appendChild(statusBadge);
                
                // Close modal
                closeModalFunction();
                
                // Show a success message
                alert(`Product ${name} updated successfully`);
            });
        });
    });
    
    // Apply filters functionality
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const statusFilter = document.getElementById('statusFilter').value;
            const searchFilter = document.getElementById('searchFilter').value;
            
            // In a real application, this would make an API call with the filters
            // For now, we'll just show a message
            alert(`Filters applied:\nStatus: ${statusFilter || 'All'}\nSearch: ${searchFilter || 'N/A'}`);
        });
    }
    
    // Reset filters functionality
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            document.getElementById('statusFilter').value = '';
            document.getElementById('searchFilter').value = '';
            
            // In a real application, this would refresh the data
            // For now, we'll just show a message
            alert('Filters reset');
        });
    }
    
    // Export products functionality
    const exportProductsBtn = document.getElementById('exportProducts');
    if (exportProductsBtn) {
        exportProductsBtn.addEventListener('click', function() {
            // In a real application, this would export the data
            // For now, we'll just show a message
            alert('In a full implementation, this would export the products data.');
        });
    }
    
    // Add product functionality
    const addProductBtn = document.getElementById('addProduct');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            // Create a modal for adding a new product
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add New Product</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="newProductName">Product Name:</label>
                            <input type="text" id="newProductName" placeholder="Enter product name">
                        </div>
                        <div class="form-group">
                            <label for="newProductUnit">Unit:</label>
                            <input type="text" id="newProductUnit" placeholder="Enter unit (e.g., kg, bag, unit)">
                        </div>
                        <div class="form-group">
                            <label for="newProductPrice">Price (TZS):</label>
                            <input type="number" id="newProductPrice" placeholder="Enter price">
                        </div>
                        <div class="form-group">
                            <label for="newProductStatus">Status:</label>
                            <select id="newProductStatus">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn cancel-btn">Cancel</button>
                        <button class="action-btn add-btn">Add Product</button>
                    </div>
                </div>
            `;
            
            // Add modal to document
            document.body.appendChild(modal);
            
            // Show modal
            modal.style.display = 'block';
            
            // Close modal events
            const closeModal = modal.querySelector('.close-modal');
            const cancelBtn = modal.querySelector('.cancel-btn');
            
            const closeModalFunction = function() {
                modal.style.display = 'none';
                document.body.removeChild(modal);
            };
            
            closeModal.addEventListener('click', closeModalFunction);
            cancelBtn.addEventListener('click', closeModalFunction);
            
            // Add product
            const addBtn = modal.querySelector('.add-btn');
            addBtn.addEventListener('click', function() {
                const name = modal.querySelector('#newProductName').value;
                const unit = modal.querySelector('#newProductUnit').value;
                const price = modal.querySelector('#newProductPrice').value;
                const status = modal.querySelector('#newProductStatus').value;
                
                // In a real application, this would make an API call to add the product
                // For now, we'll just show a message
                alert(`Product added:\nName: ${name}\nUnit: ${unit}\nPrice: ${price}\nStatus: ${status}`);
                
                // Close modal
                closeModalFunction();
            });
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-controls .action-btn');
    paginationButtons.forEach(button => {
        if (!button.disabled && !button.classList.contains('active')) {
            button.addEventListener('click', function() {
                const pageNumber = this.textContent;
                // In a real application, this would load the specified page
                // For now, we'll just show a message
                alert(`Loading page ${pageNumber}`);
            });
        }
    });
    
    // Notification badge click functionality
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('In a full implementation, this would show a notification panel.');
        });
    }
    
    // User profile click functionality
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            alert('In a full implementation, this would show a user profile menu.');
        });
    }
});

// Add CSS for modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: white;
        margin: 10% auto;
        padding: 0;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .modal-header {
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #1f2937;
    }
    
    .close-modal {
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        color: #6b7280;
    }
    
    .close-modal:hover {
        color: #1f2937;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #374151;
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
        padding: 10px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
    }
    
    .modal-footer {
        padding: 20px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    
    .cancel-btn {
        background-color: #9ca3af;
    }
    
    .cancel-btn:hover {
        background-color: #6b7280;
    }
`;

document.head.appendChild(modalStyle);