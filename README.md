# MediTrack

This is a full-stack web app designed to make activities in the hospital digitalize and make all communications easy. It makes patient registration and patients data handdeling easy.

## 📂 Project structure

This module contains two main directories:

- frontend/ - frontend (vite)
- server/ - backend (Node.js + Express)
  - **MongoDB** is used for the database

## ✔️ Prerequisites

- Node.js v22.14
- npm 11.4
- MongoDB URI and Brevo credentials
- Create .env file at the root as the same as .env.example file with the correct info, not empty string value

## 💻 Running the client side

To run the client side change your working directory to frontend/ first

### Changes directory to frontend/

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Build client

```bash
npm run build
```

- Outputs optimized assets to the dist/ folder

### Serve Production

```bash
npm run preview
```

## 🖧 Running the server side

To run the server side working directory should be at the root directory (i.e. medi-track/)

### Install Dependencies

```bash
npm install
```

### Runs the server side

```bash
npm start
```

- Open http://localhost:2100 to view it in your browser.

## 🧩 Features of the App

🔏 User authentication  
👥 User account for Admin, Doctors, Nurses, Labtechs, Finances and Registration  
👷 Role based authentication  
➕ Create patient history  
🔍 Search patient functionality  
📝 Edit and delete users  
✍🏻 Reset password

## 🛠️ Future Improvements

- Add an advanced features
- Improve mobile responsiveness
- Payment methode integration

## Live Demo

**Frontend:** https://medi-track-73qd.onrender.com/  
**Backend:** deployed on render as the frontend
