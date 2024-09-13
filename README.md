eCommerce Backend API
This is a backend API for an eCommerce application built with Node.js, Express, and MongoDB. It handles user authentication, product management, order handling, and more.

Features
User Registration & Login with JWT authentication
User profile management
Product creation, updating, and listing
Cart management
Order placement and tracking
Admin role for product and order management
Requirements
Before you begin, ensure you have the following installed on your system:

Node.js
MongoDB
Installation
1. Clone the repository:
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend

2. Install dependencies
npm install

3. Set up environment variables: Create a .env file in the root of your project and fill in the following details:
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000

4. Start the server
npm run dev

This will run the server in development mode with nodemon.

Routes
Authentication
POST /api/auth/register – Register a new user
POST /api/auth/login – Log in a user
POST /api/auth/logout – Log out a user (clears token)
User Management
GET /api/users/profile – Get user profile (Protected)
PUT /api/users/profile – Update user profile (Protected)
GET /api/users/:id – View other users' profiles (Public)
Products
GET /api/products – Get all products (Public)
POST /api/products – Create a new product (Admin only)
GET /api/products/:id – Get product by ID (Public)
PUT /api/products/:id – Update product by ID (Admin only)
DELETE /api/products/:id – Delete product by ID (Admin only)
Cart
GET /api/cart – Get user's cart (Protected)
POST /api/cart – Add items to cart (Protected)
PUT /api/cart – Update items in cart (Protected)
DELETE /api/cart/:id – Remove item from cart (Protected)
Orders
GET /api/orders – Get all user orders (Protected)
POST /api/orders – Place a new order (Protected)
GET /api/orders/:id – Get order by ID (Protected)
PUT /api/orders/:id – Update order status (Admin only)
Admin
GET /api/admin/users – Get all users (Admin only)
GET /api/admin/orders – Get all orders (Admin only)
License
This project is licensed under the MIT License.
