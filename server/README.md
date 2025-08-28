# Shamba Direct Server - MongoDB Migration

This server has been migrated from PostgreSQL with Prisma to MongoDB with Mongoose.

## Migration Summary

- Replaced Prisma ORM with Mongoose ODM
- Updated all database models and controllers to use Mongoose syntax
- Updated environment configuration for MongoDB
- Removed all Prisma-related files and dependencies

## Prerequisites

- Node.js (version 16 or higher)
- MongoDB (version 4.4 or higher)

## Setup Instructions

1. Install MongoDB:
   - For Windows: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - For macOS: `brew install mongodb-community`
   - For Linux: Follow the [official installation guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB:
   - On Windows: MongoDB service should start automatically after installation
   - On macOS/Linux: Run `mongod` in a terminal

3. Install dependencies:
   ```bash
   cd server
   npm install
   ```

4. Configure environment variables:
   - Copy `.env.example` to `.env` if it exists
   - Update `DATABASE_URL` to point to your MongoDB instance (default: `mongodb://localhost:27017/shambadirect`)

5. Start the server:
   ```bash
   npm start
   ```

## Database Models

The following Mongoose models have been created:

- **User**: Represents users, farmers, and suppliers
- **Product**: Represents agricultural products
- **Order**: Represents customer orders
- **AdminEvent**: Represents administrative actions

## API Endpoints

All existing API endpoints remain the same. The migration only changes the underlying database implementation.

## Testing

After starting the server, you can test the API endpoints using the examples in `example-requests.md`.

## Migration Notes

- UUID fields in Prisma have been replaced with MongoDB ObjectIds
- All database queries have been updated to use Mongoose syntax
- Validation middleware has been updated to work with MongoDB ObjectIds
- Password hashing and JWT token generation remain unchanged