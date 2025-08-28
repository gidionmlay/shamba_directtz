# Shamba Direct - Enhanced User Registration and Approval System

This project implements a full backend integration for user registration with admin approval workflow for Shamba Direct.

**Note: This project has been migrated from PostgreSQL with Prisma to MongoDB with Mongoose.**

## Features Implemented

### 1. User Registration
- **Farmer Registration**: Collects farmer-specific information including farm size, crops grown, etc.
- **Supplier Registration**: Collects supplier-specific information including business details, product types, etc.
- Both registration forms submit data to the backend with a "PENDING" status by default.

### 2. Admin Dashboard
- **User Management**: Admins can view all users and filter by role and status (Pending, Approved, Rejected).
- **Approval Workflow**: Admins can approve or reject pending registrations with an optional reason.
- **Role Management**: Admins can change user roles (USER, ADMIN, FARMER, SUPPLIER).

### 3. User Login
- **Status Validation**: Users with "PENDING" status are blocked from logging in with a message to wait for approval.
- **Rejection Handling**: Users with "REJECTED" status are blocked from logging in with a message to contact support.
- **First Login Experience**: Approved users see a welcome message on their first login after approval.

### 4. Dashboards
- **Farmer Dashboard**: Personalized dashboard for farmers with farm management features.
- **Supplier Dashboard**: Personalized dashboard for suppliers with product and order management features.
- **Admin Dashboard**: Enhanced user management with approval workflow.

## API Endpoints

### Registration
- `POST /api/register/farmer` - Register a new farmer
- `POST /api/register/supplier` - Register a new supplier

### Authentication
- `POST /api/login` - Authenticate user with status validation

### Admin Functions
- `GET /api/admin/users` - List users with filtering by role and status
- `PATCH /api/admin/users/:id/approve` - Approve a pending user
- `PATCH /api/admin/users/:id/reject` - Reject a pending user

## Database Schema Changes

### New Fields
- `status` (String: PENDING, APPROVED, REJECTED) - Tracks user approval status
- `firstLogin` (Boolean) - Tracks if it's the user's first login after approval
- `farmSize` (Number) - Farm size for farmers
- `companyName` (String) - Company name for suppliers
- `businessRegNo` (String) - Business registration number for suppliers
- `location` (String) - Location information for both farmers and suppliers

### New Roles
- `FARMER` - For farmer users
- `SUPPLIER` - For supplier users

### Database Migration
This project has been migrated from PostgreSQL with Prisma to MongoDB with Mongoose. All data models have been updated to use MongoDB's document-based structure instead of PostgreSQL's relational structure.

## Frontend Changes

### Registration Forms
- Updated farmer and supplier registration forms to submit to new API endpoints
- Added success page redirection after registration

### Login Form
- Updated login form to handle new status validation and first login experience

### Dashboards
- Created farmer dashboard with farm management features
- Created supplier dashboard with product and order management features
- Updated admin dashboard with approval workflow

## Setup Instructions

1. Install MongoDB Community Server and start the service
2. Install dependencies: `npm install` in the server directory
3. Start the server: `npm start` or `npm run dev` in the server directory

## Usage

1. Users register as either farmers or suppliers through the respective registration forms
2. Admins review pending registrations in the admin dashboard
3. Admins approve or reject registrations
4. Approved users can log in and see their personalized dashboard
5. First-time logins after approval see a welcome message

## Testing the Login Functionality

To test the login functionality, you can use the test-login.html file which provides a simple interface to test different login scenarios:

1. Open test-login.html in your browser
2. Enter valid credentials for a user in the system
3. Select the appropriate role (farmer, supplier, or admin)
4. Click "Test Login" to verify the login flow

The test page will show success or error messages based on the login attempt and will redirect to the appropriate dashboard upon successful authentication.

## Login Flow

The login flow works as follows:

1. User selects their role (farmer, supplier, or admin) using the tab interface
2. User enters their email/phone and password
3. Upon submission, the credentials are validated against the backend API
4. The system checks the user's status:
   - If PENDING: User is blocked with a message to wait for admin approval
   - If REJECTED: User is blocked with a message to contact support
   - If APPROVED: User is authenticated and redirected to their dashboard
5. First-time logins after approval show a welcome message

## Role-Based Redirection

After successful authentication, users are redirected to their respective dashboards:
- Farmers: farmer-dashboard.html
- Suppliers: supplier-dashboard.html
- Admins: pages/admin/dashboard.html