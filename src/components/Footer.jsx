import React from 'react'
import right from '../assets/icons/chevronRight.png'

const Footer = () => {
  return (
    <div className='fixed bottom-3 bg-[#ffffff20] w-144 h-14 rounded-[20px] flex items-center p-5 z-50 left-210'>
      <img src={right} alt='yo' className='w-9 h-auto'/>
      <p className='font-inter font-[200] italic text-white text-[20px]'>Now scraping reports from : www.facebook.com</p>
    </div>
  )
}

export default Footer