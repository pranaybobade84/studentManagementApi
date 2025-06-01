# Student Management API

A RESTful API for managing students and courses built with Node.js, Express, and MongoDB.

---

## Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/pranaybobade84/studentManagementApi.git
cd studentManagementApi
```

2. ** Install Dependencies **:
```bash
npm install
```

3. Configure environment variables:

Create a .env file in the root directory with the following variables:

```bash
PORT=4000
MONGODB_URI=
JWT_SECRET=zrU%D*FwvI=X&SkNL8Db@:YtEhj.vqo`Y%B<Qb[laXPYK=V{=BGAYx%01y37t)8
JWT_EXPIRATION=1h
```
4.Start the server:
```bash
npm start
```
🔐 Authentication Usage Guide

Your API uses JWT-based authentication. After logging in, the server returns a JWT token which:

Is automatically stored in a cookie

Can also be sent manually via the Authorization header.
```bash
POST	    /api/auth/register	            Register user (admin/student)
POST	    /api/auth/login	                 Login and receive token
```
Course Routes
Method Endpoint Description
```bash
GET	            /api/courses	                Get all courses
POST	          /api/courses                  Create a new course
PUT             /api/courses/:id              Update a course
DELETE          /api/courses/:id              Delete a course
```
{
    "title":"Namaste  JS",
    "description":"JS Course by MEEEE",
    "credits":3
}

Students Routes
Method Endpoint Description
```bash
GET	            /api/students	                Get all students
GET	            /api/students/:id                Get Specific student
POST	         /api/students                  Create a new students
PUT             /api/students/:id              Update a students
DELETE          /api/students/:id              Delete a students
```
{
   "name":"Pranay",
   "email":"pranay@gmail.com",
   "age":20,
   "department":"Science"
}

🛠 Tech Stack

  Node.js
  Express.js
  MongoDB + Mongoose
  JWT Authentication
