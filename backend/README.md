# PrimeTrade Backend API

The backend is the Node.js and Express.js service in PrimeTrade's MERN stack. It provides a versioned REST API for authentication, user profiles, and task management, using MongoDB through Mongoose as its persistence layer.

JWT authentication, bcrypt password hashing, request validation, role-based authorization, and centralized error handling protect the application. The modular route-controller-model structure keeps business logic maintainable, while Swagger documentation, rate limiting, Helmet, CORS, and request logging support secure API operation and future scalability.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`

3. Start the server:

```bash
npm run dev
```

## API Documentation

Visit `http://localhost:5000/api-docs` for complete API documentation.

## Features

- JWT Authentication
- Role-Based Access (User/Admin)
- Task Management CRUD
- Input Validation
- Error Handling
- Rate Limiting
- Security Headers

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- Swagger
