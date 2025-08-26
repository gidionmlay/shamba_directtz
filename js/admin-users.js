// Admin Users JavaScript

// API Base URL
const API_BASE_URL = '/api';

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Utility function to get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'PENDING':
            return 'status-badge pending';
        case 'APPROVED':
            return 'status-badge approved';
        case 'REJECTED':
            return 'status-badge rejected';
        default:
            return 'status-badge';
    }
}

// Utility function to get role badge class
function getRoleBadgeClass(role) {
    switch (role) {
        case 'ADMIN':
            return 'role-badge admin';
        case 'FARMER':
            return 'role-badge farmer';
        case 'SUPPLIER':
            return 'role-badge supplier';
        default:
            return 'role-badge user';
    }
}

// Load users from API
async function loadUsers(filters = {}) {
    try {
        // Show loading indicator
        const tableBody = document.getElementById('usersTableBody');
        tableBody.innerHTML = '<tr><td colspan="7" class="loading">Loading users...</td></tr>';
        
        // Build query string from filters
        const queryParams = new URLSearchParams();
        if (filters.role) queryParams.append('role', filters.role);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.search) queryParams.append('search', filters.search);
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        // Fetch users
        const response = await fetch(`${API_BASE_URL}/admin/users${queryString}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load users');
        }
        
        const data = await response.json();
        displayUsers(data.users);
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('usersTableBody').innerHTML = 
            '<tr><td colspan="7" class="error">Failed to load users. Please try again.</td></tr>';
    }
}

// Display users in the table
function displayUsers(users) {
    const tableBody = document.getElementById('usersTableBody');
    
    if (!users || users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-users">No users found.</td></tr>';
        return;
    }
    
    tableBody.innerHTML = users.map(user => `
        <tr data-user-id="${user.id}">
            <td>${user.name}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.phone || 'N/A'}</td>
            <td><span class="${getRoleBadgeClass(user.role)}">${user.role}</span></td>
            <td><span class="${getStatusBadgeClass(user.status)}">${user.status}</span></td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                ${user.status === 'PENDING' ? 
                    `<button class="action-btn approve-btn" data-user-id="${user.id}">Approve</button>
                     <button class="action-btn reject-btn" data-user-id="${user.id}">Reject</button>` :
                    user.status === 'APPROVED' ? 
                    `<button class="action-btn change-role" data-user-id="${user.id}">Change Role</button>` :
                    ''
                }
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.approve-btn').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            approveUser(userId);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            rejectUser(userId);
        });
    });
    
    document.querySelectorAll('.change-role').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            changeUserRole(userId);
        });
    });
}

// Approve user
async function approveUser(userId) {
    if (!confirm('Are you sure you want to approve this user?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/approve`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to approve user');
        }
        
        const data = await response.json();
        alert(data.message);
        
        // Reload users
        const filters = getFilters();
        loadUsers(filters);
    } catch (error) {
        console.error('Error approving user:', error);
        alert('Failed to approve user. Please try again.');
    }
}

// Reject user
async function rejectUser(userId) {
    const reason = prompt('Enter reason for rejection (optional):');
    if (reason === null) return; // User cancelled
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/reject`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason })
        });
        
        if (!response.ok) {
            throw new Error('Failed to reject user');
        }
        
        const data = await response.json();
        alert(data.message);
        
        // Reload users
        const filters = getFilters();
        loadUsers(filters);
    } catch (error) {
        console.error('Error rejecting user:', error);
        alert('Failed to reject user. Please try again.');
    }
}

// Change user role
function changeUserRole(userId) {
    // This would be similar to the existing change role functionality
    // For now, we'll just show an alert
    alert('Change role functionality would be implemented here.');
}

// Get current filter values
function getFilters() {
    return {
        role: document.getElementById('roleFilter').value,
        status: document.getElementById('statusFilter').value,
        search: document.getElementById('searchFilter').value
    };
}

// Apply filters
function applyFilters() {
    const filters = getFilters();
    loadUsers(filters);
}

// Reset filters
function resetFilters() {
    document.getElementById('roleFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('searchFilter').value = '';
    loadUsers();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Load users on page load
    loadUsers();
    
    // Apply filters functionality
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Reset filters functionality
    const resetFiltersBtn = document.getElementById('resetFilters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    // Export users functionality
    const exportUsersBtn = document.getElementById('exportUsers');
    if (exportUsersBtn) {
        exportUsersBtn.addEventListener('click', function() {
            alert('In a full implementation, this would export the users data.');
        });
    }
    
    // Add user functionality
    const addUserBtn = document.getElementById('addUser');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            alert('In a full implementation, this would show a form to add a new user.');
        });
    }
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-controls .action-btn');
    paginationButtons.forEach(button => {
        if (!button.disabled && !button.classList.contains('active')) {
            button.addEventListener('click', function() {
                alert('In a full implementation, this would load the specified page.');
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

// Add CSS for status badges
const statusBadgeStyle = document.createElement('style');
statusBadgeStyle.textContent = `
    .status-badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
    }
    
    .status-badge.pending {
        background-color: #fef3c7;
        color: #92400e;
    }
    
    .status-badge.approved {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .status-badge.rejected {
        background-color: #fee2e2;
        color: #991b1b;
    }
    
    .loading, .error, .no-users {
        text-align: center;
        padding: 20px;
        color: #6b7280;
    }
    
    .error {
        color: #dc2626;
    }
    
    .no-users {
        color: #9ca3af;
    }
`;

document.head.appendChild(statusBadgeStyle);