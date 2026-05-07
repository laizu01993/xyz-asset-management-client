# XYZ Asset Management Client

A modern, responsive **Asset Management Frontend Application** built with **React, Vite, Tailwind CSS, DaisyUI**, and **Firebase Authentication**.  
This application allows HR managers and employees to manage company assets efficiently with role-based access and a clean user experience.

🔗 **Live Website**  
https://xyz-asset-management.vercel.app

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Firebase Authentication (Email/Password & Google)
- JWT-based secure API communication
- Role-based routing (**HR / Employee**)
- Protected & private routes
- Unauthorized & error handling pages

---

### 🏢 Dynamic Company Branding
- Dynamic company logo support
- Fallback service provider logo (**XYZ**) if no company is assigned
- Tooltip shows full company name on hover
- Assignment-compliant dynamic navbar behavior

---

### 👤 User Experience
- Responsive design for all devices
- Skeleton loaders & smooth transitions
- Toast notifications for actions & errors
- Professional 404 error page
- SEO support using React Helmet

---

### 🧾 Asset Management
- Asset listing with search, filter & sort
- Asset request system (Employee)
- Request approval & rejection (HR)
- Returnable & non-returnable asset handling
- Monthly request tracking

---

### 🔔 Real-time Notifications
- Real-time notification system using Socket.IO
- Instant HR & Employee notification updates
- Live unread notification count updates
- Room-based socket communication using user email
- React Query synchronization with Socket.IO events

### 📊 Dashboard & Analytics
- HR dashboard with statistics
- Charts & visual reports using Recharts
- Top requested assets overview
- Pending request summaries

---

### 👥 Team Management (HR)
- Add/remove employees
- Team size limit enforcement
- Free employee discovery
- Package-based team expansion

---

### 💳 Payment Integration
- Stripe payment integration
- Secure checkout for HR package upgrades
- Payment history display

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Query (TanStack)
- Axios
- Firebase Authentication
- Stripe (Frontend SDK)
- Socket.IO Client (Real-time notifications)

---

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://asset-management-api-tf4m.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

▶️ Run Locally
npm install
npm run dev

🏗️ Build for Production
npm run build

🔗 Backend API

Live API:
https://asset-management-api-tf4m.onrender.com

👨‍💻 Author
Shahanara Aktar Laizu
Full Stack Developer
React • Node.js • MongoDB • Firebase • Stripe