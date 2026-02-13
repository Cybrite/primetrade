# PrimeTrade - Scalable REST API with Authentication & Role-Based Access

A full-stack application featuring a secure, scalable backend API with JWT authentication, role-based access control, and a React frontend for task management.

## 🚀 Features

### Backend

- ✅ User registration & login with JWT authentication
- ✅ Password hashing using bcrypt
- ✅ Role-based access control (User & Admin)
- ✅ CRUD operations for Tasks entity
- ✅ API versioning (v1)
- ✅ Comprehensive error handling & validation
- ✅ Swagger API documentation
- ✅ MongoDB database with Mongoose ODM
- ✅ Security features (Helmet, CORS, Rate Limiting)
- ✅ Request logging with Morgan

### Frontend

- ✅ React.js with Vite
- ✅ User authentication (Register/Login)
- ✅ Protected routes with JWT
- ✅ Task management dashboard
- ✅ CRUD operations for tasks
- ✅ Responsive UI design
- ✅ Real-time error/success messages

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd primetrade
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://harshtanishq2002_db_user:FcHAClWNONYHvetB@cluster0.w86isu1.mongodb.net/primetrade?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

The server will start at `http://localhost:5000`
Swagger documentation will be available at `http://localhost:5000/api-docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, access the Swagger documentation at:

```
http://localhost:5000/api-docs
```

### API Endpoints

#### Authentication Routes (`/api/v1/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)
- `PUT /profile` - Update user profile (Protected)

#### Task Routes (`/api/v1/tasks`)

- `GET /tasks` - Get all tasks (Protected)
- `GET /tasks/:id` - Get single task (Protected)
- `POST /tasks` - Create new task (Protected)
- `PUT /tasks/:id` - Update task (Protected)
- `DELETE /tasks/:id` - Delete task (Protected)
- `GET /tasks/stats` - Get task statistics (Admin only)

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  title: String,
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based authentication
2. **Password Hashing** - bcrypt with salt rounds
3. **Input Validation** - express-validator for request validation
4. **Rate Limiting** - Prevent brute force attacks (100 requests per 10 minutes)
5. **Helmet** - Security headers
6. **CORS** - Cross-Origin Resource Sharing configuration
7. **Role-Based Access** - User and Admin roles with different permissions

## 📁 Project Structure

```
primetrade/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── responseHandler.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   ├── Auth.css
    │   │   └── Dashboard.css
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    └── vite.config.js
```

## 🧪 Testing the Application

### Using the Frontend

1. Register a new user at `http://localhost:5173/register`
2. Login with credentials
3. Create, view, update, and delete tasks
4. Filter tasks by status
5. Logout when done

### Using Swagger UI

1. Go to `http://localhost:5000/api-docs`
2. Test each endpoint
3. Use the "Authorize" button to add JWT token

### Using Postman

Import the API endpoints and test each route with proper authentication headers.

## 🚀 Scalability Considerations

### Current Implementation

- **Modular Architecture** - Separated concerns (routes, controllers, models, middleware)
- **API Versioning** - Prepared for future API changes without breaking existing clients
- **Database Indexing** - Indexes on frequently queried fields for better performance
- **Error Handling** - Centralized error handling for consistency
- **Input Validation** - Prevents invalid data from reaching the database

### Future Scalability Enhancements

#### 1. **Microservices Architecture**

- Separate authentication service
- Dedicated task management service
- User management service
- API Gateway for routing

#### 2. **Caching Layer**

- **Redis** for session management
- Cache frequently accessed data
- Reduce database load

```javascript
// Example Redis implementation
import redis from "redis";
const client = redis.createClient();

// Cache user data
await client.set(`user:${userId}`, JSON.stringify(userData), "EX", 3600);
```

#### 3. **Database Optimization**

- **Sharding** - Distribute data across multiple databases
- **Read Replicas** - Separate read and write operations
- **Connection Pooling** - Reuse database connections

#### 4. **Load Balancing**

- Use NGINX or AWS ELB
- Distribute traffic across multiple server instances
- Auto-scaling based on demand

#### 5. **Message Queues**

- **RabbitMQ** or **Apache Kafka** for async processing
- Background jobs for email notifications
- Task processing queues

#### 6. **CDN Integration**

- CloudFlare or AWS CloudFront for static assets
- Reduce latency for global users

#### 7. **Monitoring & Logging**

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Prometheus** + **Grafana** for metrics
- **Sentry** for error tracking

#### 8. **Containerization & Orchestration**

- **Docker** for containerization
- **Kubernetes** for orchestration
- CI/CD pipeline with GitHub Actions

## 🐳 Docker Deployment (Optional)

### Backend Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Performance Optimization

1. **Database Queries**
   - Use projection to fetch only required fields
   - Implement pagination for large datasets
   - Use aggregation pipelines efficiently

2. **API Response**
   - Compress responses with gzip
   - Implement response caching
   - Use ETags for conditional requests

3. **Code Optimization**
   - Use async/await properly
   - Avoid blocking operations
   - Implement connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Harsh Tanishq**

- Email: support@primetrade.com

## 🙏 Acknowledgments

- Express.js for the backend framework
- React.js for the frontend
- MongoDB for the database
- JWT for authentication
- Swagger for API documentation

---

**Note:** This is an intern assignment project demonstrating scalable backend development with authentication, role-based access, and a functional frontend UI.
