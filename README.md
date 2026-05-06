# Task Manager API

A REST API for managing tasks with user authentication and ownership control, built using NestJS, Prisma, and PostgreSQL.

---

## 🚀 Features

- User authentication with JWT
- Password hashing with bcrypt
- Task CRUD operations
- Task ownership (users can only access their own tasks)
- Protected routes with guards
- Prisma ORM with PostgreSQL

---

## 🛠️ Tech Stack

- Node.js
- NestJS
- Prisma
- PostgreSQL
- JWT (authentication)
- bcrypt (password hashing)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
npm install
```

##⚙️ Environment Variables

Create a .env file in the root:

```
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
JWT_SECRET="your_secret_key"
```

##▶️ Running the project

```
# development
npm run start:dev

# production build
npm run build
npm run start:prod
```

## 📌 API Endpoints

###Auth
-POST /auth → login user
-GET /auth/me → get current user
###Tasks (protected)
-POST /task/add → create task
-GET /task → list user tasks
-PATCH /task/:id → update task title
-PATCH /task/:id/complete → mark task as completed
-DELETE /task/:id → delete task

##🔐 Security
-JWT-based authentication
-Passwords hashed with bcrypt
-Task ownership validation (userId check)

##📚 Notes

This project was built for learning backend development with NestJS, focusing on authentication, database relations, and clean architecture.

##🧑‍💻 Author
Rafael Grisante Dallaqua