import React from 'react'
import { Link } from 'react-router-dom'
import resqLogo from '../assets/icons/resqLogo.png'

const Navbar = () => {
  return (
    <nav className="bg-[#1D3557] sticky inter top-0 z-50 flex flex-wrap items-center justify-between px-4 py-2 gap-4">
      <Link to="/">
        <img src={resqLogo} className="h-16 w-auto mt-1 sm:h-[100px]" />
      </Link>

      <input
        placeholder="Ask Ai for information or submit missing report.."
        className="flex-grow min-w-[200px] italic font-[200] max-w-md h-12 bg-[#ffffff34] rounded-md px-4 text-white placeholder-white placeholder-opacity-80 text-sm sm:text-base"
      />

      <div className="flex flex-wrap gap-3 items-center justify-center text-white text-sm sm:text-base">
        <Link to="/records" className="font-light">Records</Link>
        <Link className="font-light">Map</Link>
        <Link to="/report" className="font-light">Report</Link>
        <Link to="/login" className="font-light">Log In</Link>
        <Link
          to="/signup"
          className="rounded-md px-4 py-2 text-white font-normal shadow-[0px_0px_10px_0px_#65C0ED80] bg-gradient-to-t from-[#165179] to-[#5F8BA7] text-sm sm:text-base"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
