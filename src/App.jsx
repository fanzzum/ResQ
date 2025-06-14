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
import Footer from "./components/Footer"
import MissingReportScreen from "./components/MissingReportScreen"
import VerifyEmail from "./components/VerifyEmail"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <MissingReportScreen/>
  

          </>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
        <Route path="/auth/email/confirm/" email={<VerifyEmail/>}/>

      </Routes>
      <Footer/>
    </>
  )
}

export default App
