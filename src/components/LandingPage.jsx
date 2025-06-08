import React from 'react'
import waveDark from '../assets/pictures/waveDark.png'
import waveLight from '../assets/pictures/waveLight.png'
import background from '../assets/pictures/bg.png'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5,1], [0.9, 0.85,0.7]) // default zoom out on full scroll
  const y = useTransform(scrollYProgress, [0,0.5, 1], [0,30,100]) 

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      navigate('/home')
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Fixed images on top of everything */}
      <motion.img
        src={waveDark}
        className='fixed scale-110 w-full z-30 top-25 cursor-grab'
        drag="x"
        style={{y}}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ duration: 3, ease: [1, 0, 0, 1] }}
        whileTap={{ cursor: 'grabbing' }}
      />
      <motion.img
        src={waveLight}
        className='fixed scale-110 w-full z-20 top-30 cursor-grab'
        drag="x"
        style={{y}}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ duration: 3, ease: [1, 0, 0, 1] }}
        whileTap={{ cursor: 'grabbing' }}
      />
      <motion.img
        src={background}
        style={{ scale }}
        className='fixed w-full scale-150'
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ duration: 3, ease: [1, 0, 0, 1] }}
        whileTap={{ cursor: 'grabbing' }}
      />

      {/* Filler div to create scroll */}
      <div className="h-[200vh]"></div>
    </div>
  )
}

export default LandingPage
