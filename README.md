# todo-app
# task-manager-app
# Task Manager with Authentication – MERN + MySQL

## Overview

This project is a full-stack **Task Manager** web application built using the **MERN** stack (MongoDB, Express, React, Node.js) along with **MySQL** for the database. It features secure user authentication via JWT and allows users to manage tasks such as creating, viewing, and deleting them.

---

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Task Management**: Add, view, and delete tasks (each task includes a title and description).
- **Secure Passwords**: Passwords are stored securely using bcrypt.
- **State Management**: React Context or Redux for managing state in the frontend.
- **Responsive Design**: Built using TailwindCSS for a responsive UI.

---

## Tech Stack

- **Frontend**: React, TailwindCSS, Axios for API requests
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt


---

## Project Structure

### Backend (`/backend` folder) .
### Explanation of Each File:
- `authController.js`: This file is responsible for handling user authentication logic, such as registration, login, and token generation.
- `tasksController.js`: Contains the logic for creating, fetching, and deleting tasks.
- `verifyToken.js`: Middleware that checks if the request contains a valid JWT token to authenticate protected routes.
- `auth.js`: Defines the routes for user authentication, such as login and registration.
- `tasks.js`: Defines the routes for managing tasks, such as adding, viewing, and deleting tasks.
- `db.js`: Handles the connection setup to the MySQL database.
- `server.js`: The entry point of the backend application that initializes the server and connects routes to their handlers.

Make sure to configure the `.env` file properly with the necessary environment variables like `JWT_SECRET` and `DB_URI` to run the application smoothly.

### frontend (`/todo-app` folder)
.

### Explanation of Each File:
- `LoginForm.js`: A React component for the user login form.
- `RegisterForm.js`: A React component for the user registration form.
- `TaskManager.js`: The UI component that handles task management, such as displaying, adding, and deleting tasks.
- `authService.js`: A service file responsible for handling all authentication-related operations, including API calls for login and registration.
- `App.js`: The main component where the application’s root logic is handled.
- `index.js`: The entry point for the React application, where ReactDOM renders the app.
- `tailwind.config.js`: The configuration file for TailwindCSS.
- `postcss.config.js`: The configuration file for PostCSS, used for CSS processing.
- `index.css`: Contains global styles applied throughout the app.
- `package.json`: Contains all dependencies and scripts for the React app.



---

## Setup Instruction


### Clone the repository
git clone https://github.com/your-username/project-name.git
cd project-name

### Backend Setup

cd backend

npm install

Create a .env file in the root of the server folder with the following variables:

JWT_SECRET=your_jwt_secret_key

DB_URI=mysql://your_database_url

Run the server:npx node server.js

### Frontend Setup

Navigate to the client directory:
cd todo-app

npm install

npm start

 ---
### Demo





![Screenshot 2025-04-12 110407](https://github.com/user-attachments/assets/314fad04-a671-4339-8ace-95e015086aa9)
![Screenshot 2025-04-12 110420](https://github.com/user-attachments/assets/5cb5dc95-e5f3-4eb8-914c-3bd8bdca6f2c)
![Screenshot 2025-04-12 110512](https://github.com/user-attachments/assets/cc56cb54-3e41-4d6f-8be7-37f2a8785b1e)






