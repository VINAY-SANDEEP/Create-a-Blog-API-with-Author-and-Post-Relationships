# Blog API with Author and Post Relationships

This is a production-ready, high-performance REST API for a Blog Platform built using Node.js, Express.js, MySQL, and Sequelize ORM under an MVC architecture. It includes features like input validation, eager loading to prevent N+1 query problems, pagination, filtering, searching, sorting, and automatically generated interactive Swagger API documentation.

## Tech Stack
- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Request Validation:** express-validator
- **API Documentation:** Swagger UI (`swagger-ui-express` & `swagger-jsdoc`)

---

## Project Structure
```text
blog-api/
├── config/
│   └── database.js         # Database configuration & credentials loader
├── controllers/
│   ├── authorController.js # Handles requests/responses for authors
│   └── postController.js   # Handles requests/responses for posts
├── middlewares/
│   ├── errorHandler.js     # Global handler for database & server exceptions
│   └── validator.js        # Request body validator schemas
├── migrations/             # Database tables creation scripts
├── models/
│   ├── index.js            # Sequelize dynamic model loader
│   ├── author.js           # Author model definition & relationships
│   └── post.js             # Post model definition & relationships
├── routes/
│   ├── index.js            # Combined endpoint router
│   ├── authorRoutes.js     # Authors endpoint configurations
│   └── postRoutes.js       # Posts endpoint configurations
├── seeders/                # Seed scripts for initial setup data
├── services/
│   ├── authorService.js    # Business logic layer for authors
│   └── postService.js      # Business logic layer for posts
├── utils/
│   └── response.js         # Consistent JSON response formatter
├── .env.example            # Environment variables example template
├── .sequelizerc            # Sequelize CLI mappings config
├── app.js                  # App configuration & middleware bindings
├── server.js               # Database connection and startup entrypoint
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- MySQL server running locally or accessible remotely

### Installation

1. **Clone or copy this repository** into your local directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and customize the database connection details:
   ```env
   PORT=5000
   NODE_ENV=development

   # Database configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=blog_db
   ```

4. **Create the Database**:
   Create a schema in your MySQL database named `blog_db` (or matching the `DB_NAME` set in your `.env` file):
   ```sql
   CREATE DATABASE blog_db;
   ```

5. **Run Migrations & Seeders**:
   Execute the migration commands to create tables and seed them with initial demo data:
   ```bash
   # Run migrations (creates authors and posts tables)
   npm run db:migrate

   # Seed database (populates demo authors and posts)
   npm run db:seed
   ```

6. **Start the server**:
   - In Development mode (with nodemon auto-restart):
     ```bash
     npm run dev
     ```
   - In Production mode:
     ```bash
     npm start
     ```

---

## API Documentation

Once the server is running, you can access the interactive Swagger API documentation UI at:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## Sample Request & Response Payloads

### 1. Authors Endpoint (`/api/v1/authors`)

#### **Create Author**
- **Method:** `POST`
- **Route:** `/api/v1/authors`
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Author created successfully",
    "data": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "updatedAt": "2026-06-19T08:00:00.000Z",
      "createdAt": "2026-06-19T08:00:00.000Z"
    }
  }
  ```

#### **Get All Authors**
- **Method:** `GET`
- **Route:** `/api/v1/authors`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Authors retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "createdAt": "2026-06-19T08:00:00.000Z",
        "updatedAt": "2026-06-19T08:00:00.000Z"
      }
    ]
  }
  ```

#### **Delete Author (Cascade Delete)**
- **Method:** `DELETE`
- **Route:** `/api/v1/authors/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Author and associated posts deleted successfully",
    "data": null
  }
  ```

---

### 2. Posts Endpoint (`/api/v1/posts`)

#### **Create Post**
- **Method:** `POST`
- **Route:** `/api/v1/posts`
- **Request Body:**
  ```json
  {
    "title": "Introduction to Sequelize",
    "content": "Sequelize is a promise-based Node.js ORM for SQL databases.",
    "author_id": 1
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Post created successfully",
    "data": {
      "id": 1,
      "title": "Introduction to Sequelize",
      "content": "Sequelize is a promise-based Node.js ORM for SQL databases.",
      "author_id": 1,
      "updatedAt": "2026-06-19T08:05:00.000Z",
      "createdAt": "2026-06-19T08:05:00.000Z",
      "author": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
      }
    }
  }
  ```

#### **Get All Posts (Paginated, Sorted & Filtered)**
- **Method:** `GET`
- **Route:** `/api/v1/posts?page=1&limit=2&sort=createdAt&order=DESC&search=Sequelize`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Posts retrieved successfully",
    "data": [
      {
        "id": 1,
        "title": "Introduction to Sequelize",
        "content": "Sequelize is a promise-based Node.js ORM for SQL databases.",
        "author_id": 1,
        "createdAt": "2026-06-19T08:05:00.000Z",
        "updatedAt": "2026-06-19T08:05:00.000Z",
        "author": {
          "id": 1,
          "name": "Jane Doe",
          "email": "jane.doe@example.com"
        }
      }
    ],
    "pagination": {
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 1,
      "limit": 2
    }
  }
  ```

---

## Postman Collection
Import the `postman_collection.json` file in the root directory directly into your Postman client to execute testing queries locally.
"# Create-a-Blog-API-with-Author-and-Post-Relationships" 
