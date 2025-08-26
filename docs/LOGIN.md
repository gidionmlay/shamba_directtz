# Shamba Direct Login System Documentation

## Overview

The Shamba Direct login system provides role-based authentication with status validation. Users can log in as farmers, suppliers, or admins, and the system validates their credentials and account status before granting access.

## Login Flow

1. **Role Selection**: Users select their role (farmer, supplier, or admin) using the tab interface
2. **Credential Entry**: Users enter their email/phone and password
3. **Submission**: Form data is submitted to the backend API
4. **Validation**: The system validates credentials and checks account status
5. **Redirection**: Upon successful authentication, users are redirected to their respective dashboards

## Account Status Validation

The login system checks the user's account status before allowing access:

- **PENDING**: Account is awaiting admin approval
  - Message: "Your account is under review. Please wait for admin approval."
  - Access is denied

- **REJECTED**: Account has been rejected by an admin
  - Message: "Your registration request was declined. Contact support for assistance."
  - Access is denied

- **APPROVED**: Account is active and approved
  - First-time login: Welcome message is displayed
  - Subsequent logins: Direct redirection to dashboard

## Role-Based Redirection

After successful authentication, users are redirected to their respective dashboards:

- **Farmers**: `./farmer-dashboard.html`
- **Suppliers**: `./supplier-dashboard.html`
- **Admins**: `../pages/admin/dashboard.html`

## API Endpoint

The login system uses the following API endpoint:

```
POST /api/login
```

### Request Body

```json
{
  "emailPhone": "string",
  "password": "string",
  "role": "farmer|supplier|admin"
}
```

### Response Format

#### Success Response

```json
{
  "code": "LOGIN_SUCCESS",
  "message": "Login successful.",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "farmer|supplier|admin",
    "isFirstLogin": "boolean"
  },
  "token": "string"
}
```

#### Error Responses

```json
{
  "code": "ACCOUNT_PENDING",
  "message": "Your account is under review. Please wait for admin approval."
}
```

```json
{
  "code": "ACCOUNT_REJECTED",
  "message": "Your registration request was declined. Contact support for assistance."
}
```

```json
{
  "code": "INVALID_CREDENTIALS",
  "message": "Invalid email/phone or password."
}
```

```json
{
  "code": "INVALID_ROLE",
  "message": "User role does not match provided role."
}
```

## Frontend Implementation

### HTML Structure

The login form uses a tab-based interface for role selection:

```html
<div class="role-tabs">
  <button class="tab-button active" data-role="farmer">Farmer</button>
  <button class="tab-button" data-role="supplier">Supplier</button>
  <button class="tab-button" data-role="admin">Admin</button>
</div>
```

### JavaScript Initialization

The login form is initialized using the `initLoginForm()` function:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (typeof initLoginForm === 'function') {
    initLoginForm();
  }
});
```

### Features

1. **Role-Based Registration Link**: The registration link updates based on the selected role
2. **Form Validation**: Client-side validation for required fields
3. **Loading State**: Button shows "Logging in..." during authentication
4. **Error Handling**: Appropriate error messages for different failure scenarios
5. **Welcome Message**: First-time logins show a welcome message
6. **Token Storage**: JWT token is stored in localStorage for authenticated requests

## Testing

To test the login functionality:

1. Open `test-login.html` in your browser
2. Enter valid credentials for a user in the system
3. Select the appropriate role (farmer, supplier, or admin)
4. Click "Test Login" to verify the login flow

The test page will show success or error messages based on the login attempt and will redirect to the appropriate dashboard upon successful authentication.

## Security Considerations

1. **Password Security**: Passwords are hashed and salted using bcrypt
2. **Token Authentication**: JWT tokens are used for session management
3. **Rate Limiting**: API endpoints are protected against brute force attacks
4. **Input Validation**: Both client-side and server-side validation is implemented
5. **HTTPS**: All communication should be encrypted in production

## Customization

To customize the login system:

1. **Styling**: Modify `css/login.css` to change the appearance
2. **Messages**: Update alert messages in `js/login.js`
3. **Redirect URLs**: Modify dashboard URLs in the login success handler
4. **Validation**: Add additional validation rules in `js/login.js`