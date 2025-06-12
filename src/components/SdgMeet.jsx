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
      initial={{ opacity: 0, y: 100 }} // Increased initial y offset
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.8 // Kept at 80% visibility requirement
      }}
      transition={{ duration: 0.5 }}
      className='w-360 h-256 bg-[linear-gradient(0deg,#2D5D7C,#264D64,#336887)] flex flex-col gap-18 p-25'
    >
      <p className='font-poppins font-[700] text-[60px] text-transparent bg-clip-text bg-gradient-to-r from-[#f8ffce] via-[#eed73e] to-[#eccd05] inline-block'>
        SDGs we meet
      </p>
      <motion.div
        className='flex gap-10'
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