// Admin Orders JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Update order status functionality
    const updateStatusButtons = document.querySelectorAll('.update-status');
    updateStatusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const orderId = row.cells[0].textContent;
            const currentStatus = row.cells[4].textContent.trim();
            
            // Create a modal for status update
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Update Order Status</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p>Order ID: <strong>${orderId}</strong></p>
                        <p>Current Status: <strong>${currentStatus}</strong></p>
                        <div class="form-group">
                            <label for="newStatus">New Status:</label>
                            <select id="newStatus">
                                <option value="PENDING" ${currentStatus.includes('Pending') ? 'selected' : ''}>Pending</option>
                                <option value="CONFIRMED" ${currentStatus.includes('Confirmed') ? 'selected' : ''}>Confirmed</option>
                                <option value="DELIVERED" ${currentStatus.includes('Delivered') ? 'selected' : ''}>Delivered</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="notes">Notes (optional):</label>
                            <textarea id="notes" rows="3" placeholder="Add any notes about the status change..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="action-btn cancel-btn">Cancel</button>
                        <button class="action-btn update-btn">Update Status</button>
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
            
            // Update status
            const updateBtn = modal.querySelector('.update-btn');
            updateBtn.addEventListener('click', function() {
                const newStatus = modal.querySelector('#newStatus').value;
                const notes = modal.querySelector('#notes').value;
                
                // In a real application, this would make an API call to update the status
                // For now, we'll just update the UI
                const statusCell = row.cells[4];
                statusCell.innerHTML = '';
                
                const statusBadge = document.createElement('span');
                statusBadge.className = `status-badge ${newStatus.toLowerCase()}`;
                statusBadge.textContent = newStatus.charAt(0) + newStatus.slice(1).toLowerCase();
                statusCell.appendChild(statusBadge);
                
                // Close modal
                closeModalFunction();
                
                // Show a success message
                alert(`Order ${orderId} status updated to ${newStatus}`);
            });
        });
    });
    
    // Apply filters functionality
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const statusFilter = document.getElementById('statusFilter').value;
            const startDateFilter = document.getElementById('startDateFilter').value;
            const endDateFilter = document.getElementById('endDateFilter').value;
            const searchFilter = document.getElementById('searchFilter').value;
            
            // In a real application, this would make an API call with the filters
            // For now, we'll just show a message
            alert(`Filters applied:\nStatus: ${statusFilter || 'All'}\nDate Range: ${startDateFilter || 'N/A'} to ${endDateFilter || 'N/A'}\nSearch: ${searchFilter || 'N/A'}`);
        });
    }
    
    // Reset filters functionality
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            document.getElementById('statusFilter').value = '';
            document.getElementById('startDateFilter').value = '';
            document.getElementById('endDateFilter').value = '';
            document.getElementById('searchFilter').value = '';
            
            // In a real application, this would refresh the data
            // For now, we'll just show a message
            alert('Filters reset');
        });
    }
    
    // Export orders functionality
    const exportOrdersBtn = document.getElementById('exportOrders');
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', function() {
            // In a real application, this would export the data
            // For now, we'll just show a message
            alert('In a full implementation, this would export the orders data.');
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
    
    .form-group select,
    .form-group textarea {
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