<div align="center">

# 🔗 **Linkup** 
### *Connect, Chat, and Collaborate in Real-Time*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-brightgreen?style=for-the-badge&logo=render)](https://linkup-pmbn.onrender.com/)
[![Tech Stack](https://img.shields.io/badge/Tech_Stack-React_Node.js-blue?style=for-the-badge&logo=react)](https://github.com/itsAdnan16/LINKUP)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

**A modern, full-stack real-time communication platform built with cutting-edge technologies**

</div>

---

## 🌐 **Live Application**

<div align="center">

[![Linkup App](https://img.shields.io/badge/🚀_Linkup_App-Live_on_Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://linkup-pmbn.onrender.com/)

**🎯 Full-stack application deployed on Render - Frontend + Backend!**

</div>

---

## 🌟 **Features**

<div align="center">

| 💬 **Real-time Messaging** | 📹 **Video Calls** | 👥 **Friend System** | 🎨 **Themes** |
|:---:|:---:|:---:|:---:|
| Instant messaging with Stream API | HD video calling with Stream SDK | Send/accept friend requests | Dark/Light theme switching |
| Message reactions & typing indicators | Screen sharing capabilities | User discovery & recommendations | 40+ beautiful DaisyUI themes |
| File sharing & media support | Group video calls | Friend status & presence | Responsive design |

</div>

---

## 🛠️ **Tech Stack**

<div align="center">

### **Frontend**
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12.24-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=json-web-tokens&logoColor=white)

### **Real-time & State Management**
![Stream API](https://img.shields.io/badge/Stream_API-Chat_%26_Video-FF6B6B?style=flat-square&logo=stream&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5.85.5-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-FF6B35?style=flat-square&logo=zustand&logoColor=white)

### **Deployment & Tools**
![Render](https://img.shields.io/badge/Render-Full_Stack-46E3B7?style=flat-square&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version_Control-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 🏗️ **Architecture Overview**

<div align="center">

[![Linkup Architecture](https://img.shields.io/badge/View_Architecture_Diagram-FF6B6B?style=for-the-badge&logo=diagram-2&logoColor=white)](https://app.eraser.io/workspace/kiTRUaytr8fJjmfPj3PQ)

**Click the button above to view the complete system architecture diagram**

</div>

### **Key Components:**
- **Frontend**: React + Vite + TailwindCSS + DaisyUI
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Stream API for chat and video
- **State Management**: Zustand + React Query
- **Deployment**: Render (Full-stack application)

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB Atlas account
- Stream.io account

### **Installation**

```bash
# Clone the repository
git clone https://github.com/itsAdnan16/LINKUP.git
cd LINKUP

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Go back to root directory
cd ..
```

### **Environment Setup**

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend `.env`:**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

**Frontend `.env`:**
```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_BACKEND_URL=http://localhost:5001
# For production: https://linkup-pmbn.onrender.com (same domain)
```

### **Running the Application**

```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server (in new terminal)
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application! 🎉

---

## 📱 **Screenshots**

<div align="center">

| **Login Page** | **Chat Interface** | **Video Call** | **Friends Page** |
|:---:|:---:|:---:|:---:|
| [![Login](https://img.shields.io/badge/View_Login_Page-1e40af?style=for-the-badge&logo=react&logoColor=white)](https://linkup-pmbn.onrender.com/login) | [![Chat](https://img.shields.io/badge/View_Chat-10b981?style=for-the-badge&logo=message-circle&logoColor=white)](https://linkup-pmbn.onrender.com) | [![Video](https://img.shields.io/badge/View_Video_Call-ef4444?style=for-the-badge&logo=video&logoColor=white)](https://linkup-pmbn.onrender.com) | [![Friends](https://img.shields.io/badge/View_Friends-8b5cf6?style=for-the-badge&logo=users&logoColor=white)](https://linkup-pmbn.onrender.com/friends) |

</div>

---

## 🎯 **Features Flow**

<div align="center">

[![Features Flow](https://img.shields.io/badge/View_Features_Flow-10b981?style=for-the-badge&logo=workflow&logoColor=white)](https://app.eraser.io/workspace/kiTRUaytr8fJjmfPj3PQ)

**Interactive diagram showing user journey and feature interactions**

</div>

---

## 🔧 **Key Features Explained**

### **🔐 Authentication System**
- JWT-based authentication with secure cookies
- Password hashing with bcrypt
- User onboarding with profile setup
- Automatic Stream user creation

### **💬 Real-time Messaging**
- Powered by Stream Chat API
- Message reactions and typing indicators
- File and media sharing
- Message history and search

### **📹 Video Calling**
- HD video calls using Stream Video SDK
- Screen sharing capabilities
- Group video calls
- Call notifications and management

### **👥 Social Features**
- Friend request system
- User discovery and recommendations
- Online status and presence
- Profile customization

### **🎨 UI/UX**
- Responsive design with Tailwind CSS
- 40+ beautiful themes with DaisyUI
- Dark/Light mode switching
- Modern React patterns with hooks

---

## 🚀 **Deployment**

### **Full-Stack Deployment on Render**
```bash
# Build the entire application
cd frontend
npm run build

# Deploy to Render using GitHub integration
# Render automatically detects and deploys both frontend and backend
```

### **Environment Variables Setup (Render)**

**Backend Environment Variables:**
- `PORT` - Auto-assigned by Render
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET_KEY` - JWT secret for authentication
- `STREAM_API_KEY` - Stream API key
- `STREAM_API_SECRET` - Stream API secret
- `NODE_ENV` - Set to "production"

**Frontend Environment Variables:**
- `VITE_STREAM_API_KEY` - Your Stream API key
- `VITE_BACKEND_URL` - Your Render backend URL (same domain)

### **Render Deployment Features**
- **Automatic deployments** from GitHub main branch
- **Full-stack hosting** for both frontend and backend
- **Environment variable management** through Render dashboard
- **Custom domain support** (optional)
- **SSL certificates** automatically provided

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

<div align="center">

**Adnan Hassan**

[![GitHub](https://img.shields.io/badge/GitHub-itsAdnan16-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/itsAdnan16)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF6B6B?style=for-the-badge&logo=portfolio&logoColor=white)](https://your-portfolio.com)

</div>

---

<div align="center">

### ⭐ **Star this repository if you found it helpful!**

**Made with ❤️ and lots of ☕**

[![GitHub stars](https://img.shields.io/github/stars/itsAdnan16/LINKUP?style=social)](https://github.com/itsAdnan16/LINKUP/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/itsAdnan16/LINKUP?style=social)](https://github.com/itsAdnan16/LINKUP/network)

</div>