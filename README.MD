# Go Todo Application

![Go Logo](https://www.techasoft.com/blog/2019/12/1576592374.png)

## Overview

This is a simple CRUD (Create, Read, Update, Delete) application built with Go and PostgreSQL. The application allows users to manage a list of todos, providing endpoints to create, retrieve, update, and delete todo items.

## Technologies Used

- **Go**: A statically typed, compiled programming language designed for simplicity and efficiency.
- **PostgreSQL**: An open-source relational database management system emphasizing extensibility and SQL compliance.
- **Fiber**: A web framework for Go that is inspired by Express.js, designed for performance and ease of use.

## Features

- Create new todos
- Retrieve all todos
- Retrieve a specific todo by ID
- Update existing todos
- Delete todos

## Getting Started

### Prerequisites

- Go (version 1.16 or higher)
- PostgreSQL (version 12 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VishuReddy-dev/crud.git
   cd crud
   ```

2. Install the required Go packages:

   ```bash
   go mod tidy
   ```

3. Set up your PostgreSQL database:

   - Create a database named `Todo_go`:
     ```sql
     CREATE DATABASE Todo_go;
     ```
   - Create the `todos` table:
     ```sql
     CREATE TABLE todos (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         title VARCHAR(255) NOT NULL,
         description TEXT,
         completed BOOLEAN DEFAULT FALSE,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. Update the database connection string in `database/db.go` with your PostgreSQL credentials:

   ```go
   connStr := "postgres://username:password@localhost:5432/Todo_go?sslmode=disable"
   ```

5. Run the application:

   ```bash
   go run .
   ```

6. The application will be available at `http://localhost:3000`.

## API Endpoints

- **POST /api/todos**: Create a new todo
- **GET /api/todos**: Retrieve all todos
- **GET /api/todos/:id**: Retrieve a specific todo by ID
- **PUT /api/todos/:id**: Update an existing todo
- **DELETE /api/todos/:id**: Delete a todo

## Example Request

To create a new todo, you can use the following cURL command:

```bash
curl -X POST http://localhost:3000/api/todos \
-H "Content-Type: application/json" \
-d '{
    "title": "Learn Go",
    "description": "Build a CRUD application with Go and PostgreSQL"
}'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Go](https://golang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Fiber](https://gofiber.io/)

![PostgreSQL Logo](https://www.postgresql.org/media/img/about/press/elephant.png)
