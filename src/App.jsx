import React from "react"
import 'leaflet/dist/leaflet.css'
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
import MissingCardDetails from "./components/MissingCardDetails"
import ReportScreen from "./components/ReportScreen"
import LogInScreen from "./components/LogInScreen"
import SignUpScreen from "./components/SignUpScreen"
import MapViewScreen from "./components/MapViewScreen"
import AdminProfile from "./components/AdminProfile"
import MissingCardAdmin from "./components/MissingCardAdmin"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <LandingPage/>
            {/* <AdminProfile/> */}
            {/* <MissingCardAdmin/> */}
  

          </>
        } />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/password/reset/confirm/:uid/:token" element={<ResetPassword />} />
        <Route path="/auth/email/confirm/:key" element={<VerifyEmail />} />
        <Route path="/report" element={<MissingReportScreen/>} />
        <Route path="/records" element={<ReportScreen/>} />
        <Route path="/map" element={<MapViewScreen/>} />
        <Route path="/profile" element={<AdminProfile/>} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
