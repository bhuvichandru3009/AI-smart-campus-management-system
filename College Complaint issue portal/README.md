# College Complaint Reporting Portal

A full-stack web application for students and teachers to submit complaints and for admins to manage them.

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React.js, Tailwind CSS  |
| Backend  | Node.js, Express.js     |
| Database | MySQL                   |

## Features

### Student / Teacher
- Login with email and password
- Submit a complaint (title, description, category)
- View all own complaints
- Track complaint status (Pending, In Progress, Resolved)
- View complaint details

### Admin
- Login
- Dashboard with complaint statistics
- View all complaints
- Search complaints by title, description, or submitter name
- Filter complaints by status
- Update complaint status
- View complaint details

## Project Structure

```
├── backend/          # Express API (MVC)
│   ├── config/       # Database connection pool
│   ├── controllers/  # Route handlers
│   ├── middleware/   # JWT auth & validation
│   ├── models/       # Database queries
│   ├── routes/       # API routes
│   └── scripts/      # Database seed script
├── frontend/         # React + Tailwind UI
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
└── database/         # SQL schema & sample data
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://www.mysql.com/) (v8+)

## Setup Instructions

### 1. Database Setup

Start MySQL and run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Copy the environment file and update your MySQL credentials:

```bash
copy .env.example .env
```

Edit `.env`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_complaint_portal
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
```

Seed the database with sample users and complaints:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Demo Login Credentials

| Role            | Email                  | Password    |
|-----------------|------------------------|-------------|
| Admin           | admin@college.edu      | admin123    |
| Student         | student@college.edu    | student123  |
| Teacher         | teacher@college.edu    | teacher123  |

## API Endpoints

### Auth
| Method | Endpoint          | Description       | Auth |
|--------|-------------------|-------------------|------|
| POST   | /api/auth/login   | Login             | No   |
| GET    | /api/auth/profile | Get user profile  | Yes  |

### Complaints
| Method | Endpoint                    | Description              | Auth  |
|--------|-----------------------------|--------------------------|-------|
| GET    | /api/complaints/categories  | List categories          | No    |
| GET    | /api/complaints/statuses    | List statuses            | No    |
| POST   | /api/complaints             | Submit complaint         | Yes   |
| GET    | /api/complaints/my          | Get own complaints       | Yes   |
| GET    | /api/complaints/:id         | Get complaint details    | Yes   |
| GET    | /api/complaints             | Get all complaints       | Admin |
| GET    | /api/complaints/stats       | Dashboard statistics     | Admin |
| PATCH  | /api/complaints/:id/status  | Update complaint status  | Admin |

## Complaint Categories

- Infrastructure
- Library
- Hostel
- IT Support
- Cleanliness
- Other

## Complaint Statuses

- Pending
- In Progress
- Resolved

## Database Tables

### users
| Column     | Type                          |
|------------|-------------------------------|
| id         | INT (PK, auto-increment)      |
| name       | VARCHAR(100)                  |
| email      | VARCHAR(150, unique)          |
| password   | VARCHAR(255, bcrypt hashed)  |
| role       | ENUM(admin, student_teacher)  |
| created_at | TIMESTAMP                     |

### complaints
| Column      | Type                          |
|-------------|-------------------------------|
| id          | INT (PK, auto-increment)      |
| user_id     | INT (FK → users.id)           |
| title       | VARCHAR(200)                  |
| description | TEXT                          |
| category    | ENUM (6 categories)           |
| status      | ENUM (3 statuses)             |
| created_at  | TIMESTAMP                     |

## Frontend Pages

1. **Login** — `/login`
2. **Student Dashboard** — `/dashboard`
3. **Submit Complaint** — `/submit`
4. **My Complaints** — `/my-complaints`
5. **Admin Dashboard** — `/admin`
6. **Manage Complaints** — `/admin/complaints`
7. **Complaint Details** — `/complaint/:id` or `/admin/complaint/:id`

## License

This project is for educational purposes.
