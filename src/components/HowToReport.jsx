import React from 'react'
import CardStack from './CardStack'
import flood from '../assets/pictures/flood.png'
const HowToReport = () => {
  return (
    <div className='w-360 h-256  bg-[linear-gradient(0deg,#165179,#2E5E7F,#5F8BA7)] relative'>
        <img src={flood} className='w-360 h-256 absolute opacity-15 object-cover'/>
        <div className='flex relative items-center  gap-120 p-24'>
        <CardStack />
        <p className='font-poppins font-[700] text-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#F2DF65] inline-block '>How to report ?</p>
        </div>
    </div>
  )
}

export default HowToReport