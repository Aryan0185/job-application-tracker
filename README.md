# Job Application Tracker

A full-stack web application to track job applications during placement season. Built as a college mini-project using the MERN-lite stack (MongoDB, Express, React, Node.js).

## Objective

Managing multiple job applications across companies, roles, and stages (Applied, OA, Interview, Rejected, Offer) becomes difficult to track manually. This project provides a simple, personal dashboard to log, filter, and monitor job applications in one place.

## Tech Stack

Frontend: React (hooks), React Router DOM, Axios, custom CSS
Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs

## Features

- User Signup/Login with JWT-based authentication
- Add, view, and delete job applications
- Each application includes: Company, Role, Status, Applied Date, Notes
- Filter applications by status (Applied / OA / Interview / Rejected / Offer)
- Dashboard with live stats: total, applied, interview, rejected, offer counts
- Each user only sees their own applications (protected routes)
- Responsive, colorful UI

## Project Structure

college_project/
  backend/  - models, routes, middleware, server.js, .env
  frontend/ - src/pages (Login, Signup, Dashboard), App.jsx, index.css

## How to Run

Backend:
  cd backend
  npm install
  node server.js
  Runs on http://localhost:5000

Frontend:
  cd frontend
  npm install
  npm run dev
  Runs on http://localhost:5173

Environment Variables (backend/.env):
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key

## Screenshots

(Add screenshots of Login page, Signup page, and Dashboard here before submission)

## Future Scope

- Deploy backend (Render) and frontend (Vercel) for live demo
- Edit application feature
- Email reminders for pending applications
- Data visualization charts for application trends

## Author

Aryan - B.Tech CSE, Sobhasaria Group of Institutions, Sikar
