# 🚗 Work Garage App

A full-stack **MERN** project management app to organize your work with projects, tasks, and a personal profile dashboard.

![Stack](https://img.shields.io/badge/Stack-MERN-blue) ![Status](https://img.shields.io/badge/Status-Active-green) ![License](https://img.shields.io/badge/License-ISC-lightgrey)

---

## ✨ Features

- 📁 Create, edit, and delete **projects**
- ✅ Add, update, and delete **tasks** with priority, due date, and assignee
- 📊 **Dashboard** with progress bars and task stats per project
- 👤 **Profile settings** with avatar upload and theme toggle (light/dark)
- 💾 All data persisted in **MongoDB**
- 🔗 REST API backend with **Express.js**

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS        |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB (Mongoose)                  |
| HTTP      | Axios                               |
| Routing   | React Router v6                     |
| Icons     | Lucide React                        |

---

## 📂 Project Structure

```
work-garage-app/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api.js           # Axios API service
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/           # Dashboard, Projects, Tasks, Settings
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env                 # VITE_API_URL
│
├── backend/                 # Express backend
│   ├── config/db.js         # MongoDB connection
│   ├── models/              # Project, User schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   └── .env                 # PORT, MONGO_URI
```

---

## 🚀 Getting Started (Local)

### Prerequisites
- Node.js >= 18
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/anuraggiri-do-it/work-garage-app.git
cd work-garage-app
git checkout backend-development
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/work-garage
# OR for Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/work-garage
```

Start the backend:

```bash
npm run dev
```

Backend runs on → `http://localhost:5000`

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint                              | Description          |
|--------|---------------------------------------|----------------------|
| GET    | `/api/projects`                       | Get all projects     |
| POST   | `/api/projects`                       | Create a project     |
| PUT    | `/api/projects/:id`                   | Update a project     |
| DELETE | `/api/projects/:id`                   | Delete a project     |
| POST   | `/api/projects/:id/tasks`             | Add a task           |
| PUT    | `/api/projects/:id/tasks/:taskId`     | Update a task        |
| DELETE | `/api/projects/:id/tasks/:taskId`     | Delete a task        |
| GET    | `/api/user/profile`                   | Get user profile     |
| PUT    | `/api/user/profile`                   | Update user profile  |

---

## 🌍 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo → select `client/` as root directory
3. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy

### Backend → Render (free)

1. Go to [render.com](https://render.com) → New Web Service → connect repo
2. Set root directory to `backend/`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables: `PORT`, `MONGO_URI` (Atlas URI)

---

## 📌 Status

- ✅ Frontend complete
- ✅ Backend API complete
- ✅ MongoDB integration complete
- 🔜 Authentication (coming soon)
- 🔜 Drag-and-drop tasks (coming soon)
