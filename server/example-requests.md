# Example Requests for Testing

## Authentication

### Register a new user
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+255712345678",
    "password": "password123",
    "role": "USER"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailPhone": "john@example.com",
    "password": "password123"
  }'
```

### Get current user profile
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Products

### Get all products
```bash
curl -X GET http://localhost:3000/api/products
```

### Get product by ID
```bash
curl -X GET http://localhost:3000/api/products/PRODUCT_ID
```

### Create product (admin only)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "name": "Maize Seeds",
    "unit": "kg",
    "price": 500.0
  }'
```

### Update product (admin only)
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "name": "Maize Seeds",
    "unit": "kg",
    "price": 550.0
  }'
```

### Delete product (admin only)
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## Orders

### Create order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productName": "Maize Seeds",
    "quantity": "10kg",
    "notes": "Urgent delivery needed"
  }'
```

### Get user's orders
```bash
curl -X GET http://localhost:3000/api/orders/my \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get all orders (admin only)
```bash
curl -X GET http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### Update order status (admin only)
```bash
curl -X PUT http://localhost:3000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "status": "CONFIRMED",
    "notes": "Order confirmed and will be delivered tomorrow"
  }'
```

### Delete order (admin only)
```bash
curl -X DELETE http://localhost:3000/api/orders/ORDER_ID \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## Suppliers

### Get all suppliers
```bash
curl -X GET http://localhost:3000/api/suppliers
```

### Get supplier by ID
```bash
curl -X GET http://localhost:3000/api/suppliers/SUPPLIER_ID
```

### Create supplier (admin only)
```bash
curl -X POST http://localhost:3000/api/suppliers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "name": "AgriTech Solutions",
    "companyName": "AgriTech Solutions Ltd",
    "businessRegNo": "BRN123456",
    "email": "info@agritech.co.tz",
    "phone": "+255712345679",
    "location": "Dar es Salaam, Tanzania"
  }'
```

### Update supplier (admin only)
```bash
curl -X PUT http://localhost:3000/api/suppliers/SUPPLIER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "name": "AgriTech Solutions",
    "companyName": "AgriTech Solutions Ltd",
    "businessRegNo": "BRN123456",
    "email": "info@agritech.co.tz",
    "phone": "+255712345679",
    "location": "Dar es Salaam, Tanzania",
    "status": "APPROVED"
  }'
```

### Delete supplier (admin only)
```bash
curl -X DELETE http://localhost:3000/api/suppliers/SUPPLIER_ID \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## Admin Operations

### Get all users (admin only)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### Approve user (admin only)
```bash
curl -X PATCH http://localhost:3000/api/users/USER_ID/approve \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

### Reject user (admin only)
```bash
curl -X PATCH http://localhost:3000/api/users/USER_ID/reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "reason": "Incomplete registration information"
  }'
```

### Update user role (admin only)
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "role": "ADMIN"
  }'
```

### Delete user (admin only)
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"