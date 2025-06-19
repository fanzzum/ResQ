import React from 'react';
import { motion } from 'framer-motion';
import SdgCard from './SdgCard';
import heart from '../assets/icons/heart.png';
import building from '../assets/icons/building.png';
import tech from '../assets/icons/tech.png';
import car from '../assets/icons/car.png';

// Variants for container and cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 400  // Increased from 230 to 400 for more dramatic rise
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7,  // Slightly increased duration for longer animation
      ease: [0.42, 0, 0.58, 1] // Added custom easing for smoother motion
    },
  },
};

const SdgMeet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.8
      }}
      transition={{ duration: 0.5 }}
      className='w-full max-w-[1920px] mx-auto bg-[linear-gradient(0deg,#2D5D7C,#264D64,#336887)] flex flex-col gap-8 md:gap-14 xl:gap-18 px-4 md:px-10 xl:px-24 py-8'
    >
      <p className='font-poppins font-[700] text-3xl md:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#f8ffce] via-[#eed73e] to-[#eccd05] text-center'>
        SDGs we meet
      </p>
      <motion.div
        className='flex flex-col md:flex-row gap-6 md:gap-10 xl:gap-14 justify-center items-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={cardVariants}>
          <SdgCard
            icon={heart}
            num={3}
            title='Good Health and Well-being'
            desc='Helping families locate missing persons faster during crises.'
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SdgCard
            icon={building}
            num={11}
            title='Sustainable Cities and Communities'
            desc='Strengthening disaster response through real-time reporting.'
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SdgCard
            icon={tech}
            num={9}
            title='Industry, Innovation and Infrastructure'
            desc='Using AI and data to modernize humanitarian action.'
          />
        </motion.div>
        <motion.div variants={cardVariants}>
          <SdgCard
            icon={car}
            num={17}
            title='Partnerships for the Goals'
            desc='Connecting citizens, NGOs, and responders to save lives.'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SdgMeet;