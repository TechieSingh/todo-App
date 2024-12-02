
---
hello
# **To-Do List Web Application**

A simple app to manage tasks with features like create, view, update, delete, and filter by status.

---

## **Features**
- Add, view, edit, and delete tasks.
- Filter tasks by status (Pending or Completed).

---

## **Getting Started**

### **Prerequisites**
- Node.js and npm installed.

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```
2. Install dependencies:
    - Backend:
      ```bash
      cd backend
      npm install
      ```
    - Frontend:
      ```bash
      cd ../frontend
      npm install
      ```

### **Running the App**
1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

Access the app at `http://localhost:3000`.

---

## **API Endpoints**
- `GET /tasks`: Get all tasks (filter by status with `?status=pending`).
- `POST /tasks`: Add a new task.
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.

---

## **Tech Stack**
- Backend: Node.js, Express, SQLite
- Frontend: React.js

---

## **Future Enhancements**
- Add authentication.
- Notifications for tasks.
- Task completion analytics.

---

Enjoy managing your tasks! 😊