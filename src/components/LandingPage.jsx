import React, { useRef, useState } from 'react'
import waveDark from '../assets/pictures/waveDark.png'
import waveLight from '../assets/pictures/waveLight.png'
import background from '../assets/pictures/bg.png'
import bgwater from '../assets/pictures/bgwater.png'
import sun from '../assets/pictures/sun.png'
import boat from '../assets/pictures/boat.png'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AskAi from './AskAi'

const LandingPage = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [canInteract, setCanInteract] = useState(false)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.9, 0.85, 0.7])
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [0, 30, 100])

  const boatX = useTransform(scrollYProgress, [0.7, 1], ['-100%', '50%'])
  const boatOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  const sunX = useTransform(scrollYProgress, [0.9, 1], ['-50%', '40%'])
  const sunY = useTransform(scrollYProgress, [0.9, 1], [0, -50])
  const sunOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  // Modified threshold from 0.9 to 0.8 for earlier interaction
  const askAiOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])

  // Add this useMotionValueEvent hook
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCanInteract(latest > 0.85)
  })

  const askAiStyle = {
    opacity: askAiOpacity,
    pointerEvents: canInteract ? 'auto' : 'none',
    userSelect: canInteract ? 'auto' : 'none',
  }

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      navigate('/home')
    }
  }

  return (
    <div className="relative">
      {/* Parallax section */}
      <div ref={scrollRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.img
            src={waveDark}
            className="absolute scale-110 w-full z-30 top-25 cursor-grab"
            drag="x"
            style={{ y }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />
          <motion.img
            src={waveLight}
            className="absolute scale-110 w-full z-20 top-30 cursor-grab"
            drag="x"
            style={{ y }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />
          <motion.img
            src={background}
            className="absolute w-full scale-150"
            style={{ scale }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />
          <motion.img
            src={bgwater}
            className="absolute w-full scale-150 z-0"
            style={{
              opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 0.3, 1]),
              scale,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />
          <motion.img
            src={sun}
            className="absolute z-30 w-48 bottom-80"
            style={{
              x: sunX,
              y: sunY,
              opacity: sunOpacity,
            }}
            transition={{
              delay: 0.1,
              duration: 3,
              ease: [0.42, 0.02, 0.63, 0.97],
            }}
          />
          <motion.div
            className="relative z-50 top-50"
            style={askAiStyle}
            transition={{ duration: 3, ease: [0.42, 0.02, 0.63, 0.97] }}
          >
            <AskAi />
          </motion.div>
          {/* Boat */}
          <motion.img
            src={boat}
            className="absolute z-40 w-[681px] bottom-0"
            style={{
              x: boatX,
              opacity: boatOpacity,
            }}
            transition={{
              delay: 0.1,
              duration: 3,
              ease: [0.42, 0.02, 0.63, 0.97],
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
