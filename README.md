# MySongs

This is a full-stack web app designed to make activities in the hospital digitalize and make all communications easy. It makes patient registration and patients data handdeling easy.

## 📂 Project structure

This module contains two main directories:

- frontend/ - frontend (vite)
- server/ - backend (Node.js + Express)
  - **MongoDB** is used for the database

## ✔️ Prerequisites

- Node.js v22.14
- npm 11.4
- MongoDB URI

## 💻 Running the client side

To run the client side change your working directory to frontend/ first

```bash
cd frontend
```

- Changes directory to frontend/

```bash
npm install
```

- Install dependencies

```bash
npm run build
```

- Compile the TypeScript files
- Outputs optimized assets to the dist/ folder

```bash
npm run preview
```

- Serves production build at http://localhost:4173/

## 🖧 Running the server side

To run the server side working directory should be at the root directory (i.e. MySongs/)

```bash
npm install
```

- Install dependencies

```bash
npm start
```

- Runs the server side of the app in the production mode.
- Open http://localhost:2100 to view it in your browser.

## 🧩 Features of the App

🔏 User authentication  
👥 User account for Admin, Doctors, Nurses, Labtechs, Finances and Registration  
👷 Role based authentication  
➕ Create patient history
🔍 Search patient functionality  
📝 Edit and delete users

## 🛠️ Future Improvements

- Add an advanced features
- Improve mobile responsiveness
- Payment methode integration

## Live Demo

**Frontend:** https://medi-track-73qd.onrender.com/  
**Backend:** deployed on render as the frontend
