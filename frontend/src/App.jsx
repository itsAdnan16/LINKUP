import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import OnboardingPage from './Pages/OnboardingPage'
import ChatPage from './Pages/ChatPage'
import CallPage from './Pages/CallPage'
import Notifications from './Pages/Notifications'
import LoginPage from './Pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

const App = () => {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false, // auth check
  });

  const authUser = authData?.user;

  return (
    <div className='h-screen' data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={!authUser ? <OnboardingPage /> : <Navigate to="/" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
