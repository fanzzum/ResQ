import React from 'react'
import right from '../assets/icons/chevronRight.png'

const Footer = () => {
  return (
    <div className="fixed bottom-0 right-0 m-3 bg-[#4e797a80] w-full max-w-xl h-14 rounded-[20px] flex items-center p-3 md:p-5 z-50 shadow-lg">
      <img src={right} alt="yo" className="w-7 md:w-9 h-auto" />
      <p className="font-inter font-[200] italic text-white text-[16px] md:text-[20px] ml-3 truncate">
        Now scraping reports from : www.facebook.com
      </p>
    </div>
  )
}

export default Footer