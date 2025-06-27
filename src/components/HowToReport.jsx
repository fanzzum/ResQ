import React from 'react'
import CardStack from './CardStack'
import flood from '../assets/pictures/flood.png'
const HowToReport = () => {
  return (
    <div className='w-full min-h-[1000px] md:min-h-[100vh] xl:min-h-[100vh] relative bg-[linear-gradient(0deg,#165179,#2E5E7F,#5F8BA7)] flex gap-20 justify-between py-42 md:py-44'>
      <img
        src={flood}
        className='w-full h-full absolute top-0 left-0 opacity-15 object-cover pointer-events-none z-0'
        style={{ minHeight: '100%', maxHeight: '100%', objectFit: 'cover' }}
        alt="Flood background"
      />
      <div className='flex flex-col md:flex-row relative items-center gap-8 md:gap-24 xl:gap-40 px-4 md:px-10 xl:px-24 z-10'>
        <CardStack />
        <p className='font-poppins normalhov font-[700] text-[50px]  md:text-[30px] xl:text-[50px] text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#F2DF65] text-right pl-85 md:text-right'>
          How to report ?
        </p>
      </div>
    </div>
  )
}

export default HowToReport