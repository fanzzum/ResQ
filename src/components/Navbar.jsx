import React from 'react'
import { Link } from 'react-router-dom'
import resqLogo from '../assets/icons/resqLogo.png'

const Navbar = () => {
  return (
    <nav className="flex bg-[#1D3557] h-[144px] items-center gap-[38px] sticky z-50 top-0">
       <Link to="/"> <img src={resqLogo} className="h-[133px] w-auto mt-[7px]"></img></Link>
        <input placeholder="Ask Ai for information or submit missing report.." className="w-[588px] h-[61px]  mr-[80px] bg-[#ffffff34] rounded-[10px]
  placeholder-white placeholder:font-inter
    placeholder:font-[200]
    placeholder:italic
    placeholder:text-[20px]
    placeholder:leading-[100%]
    placeholder:tracking-[0]
    placeholder:pl-[29px]"></input>
    <Link className="font-[300] text-[24px] font-inter text-white" to="/records">Records</Link>
    <Link className="font-[300] text-[24px] font-inter text-white">Map</Link>
    <Link className="font-[300] text-[24px] font-inter text-white" to="/report">Report</Link>
    <Link className="font-[300] text-[24px] font-inter text-white" to="/login">Log In</Link>
    <Link className="w-[109px] h-[42px] rounded-[8px] text-white font-[inter] font-normal shadow-[0px_0px_10px_0px_#65C0ED80] text-[20px] bg-[linear-gradient(0deg,#165179,#2E5E7F,#5F8BA7)] justify-center flex items-center" to="/signup">Sign Up</Link>
    </nav>
  )
}

export default Navbar