import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import resqLogo from '../assets/icons/resqLogo.png'
import avatar from '../assets/icons/avatar.png'

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('access')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload() // Ensures UI updates everywhere
  }

  return (
    <nav className="bg-[#1D3557] sticky inter top-0 z-50 flex flex-wrap items-center justify-between px-4 py-2 gap-4">
      <Link to="/">
        <img src={resqLogo} className="h-16 w-auto mt-1 sm:h-[100px]" />
      </Link>

      <input
        placeholder="Ask Ai for information or submit missing report.."
        className="flex-grow min-w-[200px] italic font-[200] max-w-md h-12 bg-[#ffffff34] rounded-md px-4 text-white placeholder-white placeholder-opacity-80 text-sm sm:text-base"
      />

      <div className="flex flex-wrap gap-8 items-center justify-center text-white text-sm sm:text-base">
        <Link to="/records" className="font-light bluehov p-3">Records</Link>
        <Link className="font-light bluehov p-3" to="/map">Map</Link>
        <Link to="/report" className="font-light bluehov p-3">Report</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="font-light">Log In</Link>
            <Link
              to="/signup"
              className="rounded-md px-4 py-2 text-white font-normal shadow-[0px_0px_10px_0px_#65C0ED80] bg-gradient-to-t from-[#165179] to-[#5F8BA7] text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <img
                src={avatar}
                alt="Profile"
                className="w-12 h-12 bluehov rounded-full border-2 border-white object-cover"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="font-light bluehov bluehov p-3  border-none outline-none cursor-pointer"
              
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
