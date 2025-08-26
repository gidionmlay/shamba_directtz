# Shamba Direct API

This is the backend API for the Shamba Direct platform, built with Node.js, Express, and Prisma ORM.

## API Endpoints

### Authentication

#### Register a new user
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+255712345678",
  "password": "password123",
  "role": "USER"
}
```

#### Register a farmer
```http
POST /api/users/register/farmer
Content-Type: application/json

{
  "fullName": "John Farmer",
  "nationalId": "123456789",
  "phone": "+255712345678",
  "email": "johnfarmer@example.com",
  "region": "Arusha",
  "district": "Arusha Cbd",
  "village": "Center Point",
  "farmSize": "5.5",
  "password": "password123",
  "confirmPassword": "password123",
  "terms": true
}
```

#### Register a supplier
```http
POST /api/users/register/supplier
Content-Type: application/json

{
  "companyName": "AgriTech Solutions Ltd",
  "businessRegNo": "REG12345",
  "productType": "Seeds and Fertilizers",
  "contactFullName": "Jane Supplier",
  "contactPhone": "+255712345679",
  "contactEmail": "jane@agritechsolutions.com",
  "region": "Dar es Salaam",
  "district": "Kinondoni",
  "businessAddress": "123 Business Street",
  "password": "password123",
  "confirmPassword": "password123",
  "terms": true
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "emailPhone": "john@example.com",
  "password": "password123"
}
```

#### Get current user profile
```http
GET /api/users/me
Authorization: Bearer <token>
```

### Users (Admin only)

#### Get all users
```http
GET /api/users
Authorization: Bearer <admin_token>
```

#### Approve a user
```http
PATCH /api/users/{userId}/approve
Authorization: Bearer <admin_token>
```

#### Reject a user
```http
PATCH /api/users/{userId}/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Incomplete registration information"
}
```

#### Update user role
```http
PUT /api/users/{userId}/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "ADMIN"
}
```

#### Delete a user
```http
DELETE /api/users/{userId}
Authorization: Bearer <admin_token>
```

### Products

#### Get all products
```http
GET /api/products
```

#### Get a product by ID
```http
GET /api/products/{productId}
```

#### Create a product (Admin only)
```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Maize Seeds",
  "unit": "kg",
  "price": 500.0,
  "supplierId": "supplier-uuid"
}
```

#### Update a product (Admin only)
```http
PUT /api/products/{productId}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Maize Seeds Premium",
  "unit": "kg",
  "price": 550.0,
  "supplierId": "supplier-uuid"
}
```

#### Delete a product (Admin only)
```http
DELETE /api/products/{productId}
Authorization: Bearer <admin_token>
```

### Orders

#### Create an order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "Maize Seeds",
  "quantity": "10kg",
  "notes": "Delivery needed by Friday"
}
```

#### Get current user's orders
```http
GET /api/orders/my
Authorization: Bearer <token>
```

#### Get all orders (Admin only)
```http
GET /api/orders
Authorization: Bearer <admin_token>
```

#### Update order status (Admin only)
```http
PUT /api/orders/{orderId}/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "CONFIRMED",
  "notes": "Order confirmed and will be delivered on Friday"
}
```

#### Delete an order (Admin only)
```http
DELETE /api/orders/{orderId}
Authorization: Bearer <admin_token>
```

### Suppliers

#### Get all suppliers
```http
GET /api/suppliers
```

#### Get a supplier by ID
```http
GET /api/suppliers/{supplierId}
```

#### Create a supplier (Admin only)
```http
POST /api/suppliers
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Supplier",
  "companyName": "AgriTech Solutions Ltd",
  "businessRegNo": "REG12345",
  "email": "jane@agritechsolutions.com",
  "phone": "+255712345679",
  "location": "Dar es Salaam, Tanzania"
}
```

#### Update a supplier (Admin only)
```http
PUT /api/suppliers/{supplierId}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Supplier",
  "companyName": "AgriTech Solutions Ltd",
  "businessRegNo": "REG12345",
  "email": "jane@agritechsolutions.com",
  "phone": "+255712345679",
  "location": "Dar es Salaam, Tanzania",
  "status": "APPROVED"
}
```

#### Delete a supplier (Admin only)
```http
DELETE /api/suppliers/{supplierId}
Authorization: Bearer <admin_token>
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/shambadirect

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run db:setup
```

3. Start the server:
```bash
npm start
```

4. For development with auto-reload:
```bash
npm run dev