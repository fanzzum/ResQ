import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import resqLogo from '../assets/icons/resqLogo.png'
import avatar from '../assets/icons/avatar.png'
import ChatApp from './ChatApp'

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('access')
  const navigate = useNavigate()
  const [showChat, setShowChat] = useState(false)
  const [pendingMessage, setPendingMessage] = useState('')
  const inputRef = useRef(null)

  // Get role from localStorage
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  // Handle Enter key in navbar input
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputRef.current.value.trim()) {
      setPendingMessage(inputRef.current.value)
      setShowChat(true)
      inputRef.current.value = ''
    }
  }

  // Overlay click handler to close chat
  const handleOverlayClick = (e) => {
    if (e.target.id === 'chat-overlay') setShowChat(false)
  }

  // Determine profile link based on role
  let profileLink = '/profile'
  if (role === 'volunteer') profileLink = '/volunteer-profile'
  else if (role === 'admin') profileLink = '/admin-profile'

  return (
    <>
      <nav className="bg-[#1D3557] sticky inter top-0 z-50 flex flex-wrap items-center justify-between px-4 py-2 gap-4">
        <Link to="/">
          <img src={resqLogo} className="h-16 w-auto mt-1 sm:h-[100px]" />
        </Link>

        <input
          ref={inputRef}
          placeholder="Ask Ai for information or submit missing report.."
          className="flex-grow min-w-[200px] italic font-[200] max-w-md h-12 bg-[#ffffff34] rounded-md px-4 text-white placeholder-white placeholder-opacity-80 text-sm sm:text-base"
          onKeyDown={handleInputKeyDown}
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
              <Link to={profileLink}>
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-12 h-12 bluehov rounded-full border-2 border-white object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="font-light bluehov bluehov p-3 border-none outline-none cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ChatApp Overlay */}
      {showChat && (
        <div
          id="chat-overlay"
          className="fixed inset-0 z-[9999] bg-transparent backdrop-blur-md flex items-start justify-center"
          onClick={handleOverlayClick}
        >
          <div className="mt-10 w-full max-w-[1300px] relative" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="absolute top-14 left-14 z-10 text-3xl  text-white text-[45px]    w-10 h-10 flex items-center justify-center hover:bg-opacity-100 transition"
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            <ChatApp initialMessage={pendingMessage} />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
