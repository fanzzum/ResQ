import React, { useRef, useState } from 'react'
import waveDark from '../assets/pictures/waveDark.png'
import waveLight from '../assets/pictures/waveLight.png'
import background from '../assets/pictures/bg.png'
import bgwater from '../assets/pictures/bgWater.png'
import sun from '../assets/pictures/sun.png'
import boat from '../assets/pictures/boat.png'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AskAi from './AskAi'
import HelpStartsWithaTap from '../components/HelpStartsWithATap'
import HowToReport from './HowToReport'
import SdgMeet from './SdgMeet'
import RestLanding from './RestLanding'

const LandingPage = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [canInteract, setCanInteract] = useState(false)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.08, 1], [0.9, 0.85, 0.7])
  const y = useTransform(scrollYProgress, [0, 0.08, 1], [0, 30, 100])
  const headingOpacity = useTransform(scrollYProgress, [0,0.2, 0.6,0.8,1], [0,1, 0.9, 0.2,0])

  const boatX = useTransform(scrollYProgress, [0.7, 1], ['-100%', '50%'])
  const boatOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  const sunX = useTransform(scrollYProgress, [0.9, 1], ['-50%', '40%'])
  const sunY = useTransform(scrollYProgress, [0.9, 1], [0, -50])
  const sunOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  const askAiOpacity = useTransform(scrollYProgress, [0.75,0.85, 0.95], [0, 1,1])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
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
    <div className="relative w-full">
      <div ref={scrollRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* --- Heading text that fades out --- */}
          <motion.div
            className="w-full flex justify-center items-center absolute top-75 left-0 z-10 pointer-events-none"
            style={{ opacity: headingOpacity }}
          >
            <h1 className="font-[700] font-poppins text-3xl leading-14.5 md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#f2fbb0] drop-shadow-lg text-center px-10 mt-8">
              ResQMap – the world’s first AI-powered<br /> platform that scrapes, verifies, and maps every<br /> missing person report online, giving rescuers<br /> real-time, intelligent access to critical data.
            </h1>
          </motion.div>

          {/* --- Animated elements --- */}
          <motion.img
            src={waveDark}
            className="absolute scale-110 w-full z-30 top-25 cursor-grab"
            drag="x"
            style={{ y }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 1, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />

          <motion.img
            src={waveLight}
            className="absolute scale-110 w-full z-20 top-30 cursor-grab"
            drag="x"
            style={{ y }}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 1, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />

          <motion.img
            src={background}
            className="absolute w-full  scale-150"
            style={{ scale }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />

          <motion.img
            src={bgwater}
            className="absolute w-full  bottom-5 z-0"
            style={{
              scaleX: 1,
              scaleY: 1.5,
              opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 0.7, 1]),
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{ duration: 3, ease: [1, 0, 0, 1] }}
            whileTap={{ cursor: 'grabbing' }}
          />

          <motion.img
            src={sun}
            className="absolute z-30 w-48 bottom-130"
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

      <HelpStartsWithaTap />
      <HowToReport />
      <SdgMeet />
      <RestLanding />
    </div>
  )
}

export default LandingPage

