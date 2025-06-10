import React from "react"
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import MissingCard from "./components/MissingCard"
import MissingReport from "./components/MissingReport"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import LandingPage from "./components/LandingPage"
import AskAi from "./components/AskAi"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <LandingPage/>
          </>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/password/reset/confirm/:uid/:token" element={<ResetPassword />} />

      </Routes>
    </>
  )
}

export default App
