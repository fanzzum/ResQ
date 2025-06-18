import React from 'react'
import { motion } from 'framer-motion'
import LogIn from '../components/LogIn'
import login1 from '../assets/pictures/login1.png'
import login2 from '../assets/pictures/login2.png'

const floatAnimation = {
  animate: {
    x: ["0%", "30%", "-20%", "0%"],
    y: ["0%", "-20%", "10%", "0%"],
    scale: [1, 1.2, 0.9, 1],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

const LogInScreen = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#266B92] to-[#EEEEEE]'>
      {/* Background Ellipses */}
      <motion.img
        src={login1}
        alt='bg1'
        className='absolute w-[600px] h-[600px] blur-[60px] opacity-60 -z-10'
        style={{ top: '20%', left: '5%' }}
        {...floatAnimation}
      />
      <motion.img
        src={login2}
        alt='bg2'
        className='absolute w-[600px] h-[600px] blur-[60px] opacity-60 -z-10 rotate-[33.8deg]'
        style={{ top: '30%', left: '60%' }}
        {...floatAnimation}
      />

      {/* Foreground Content */}
      <LogIn />
    </div>
  )
}

export default LogInScreen
