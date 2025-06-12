import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const cards = [
  {
    title: 'Go to the Report Page',
    description: (
      <p>
        Click the <span className="text-blue-900 font-semibold">“Report”</span> button on the homepage or dashboard.
      </p>
    ),
  },
  {
    title: 'Fill in the Details',
    description: (
      <>
        <p>Enter:</p>
        <ul className="list-disc list-inside">
          <li>Name</li>
          <li>Age & Description</li>
          <li>Last known location (can pin on map)</li>
          <li>Upload a recent photo (optional)</li>
          <li>Contact info (for updates)</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Verify & Submit',
    description: (
      <p>
        If you're a registered user, your report is submitted instantly.<br />
        If not, we’ll ask for basic email/phone verification to prevent spam.
      </p>
    ),
  },
  {
    title: 'Track the Case',
    description: (
      <p>
        Once submitted, the case appears on the map.<br />
        You can edit or add updates.<br />
        Verified responders may contact you if needed.
      </p>
    ),
  },
  {
    title: 'Reminder:',
    description: (
      <>
        <p>Important:</p>
        <ul className="list-disc list-inside">
          <li>Avoid duplicate reports — check the map first.</li>
          <li>Reports marked “Found” by verified rescuers are auto-closed.</li>
        </ul>
      </>
    ),
  },
];

const colors = ['#AACBCD', '#79ACAE', '#2C6B93', '#1E5578', '#1D3557'];

const rotation = (index) => -5 * index;

const Card = ({ title, description, index, isTop, onSwipe, bgColor }) => {
  return (
    <motion.div
      drag={isTop ? 'x' : false}
      onDragEnd={(e, info) => {
        if (isTop && (info.offset.x < -100 || info.offset.x > 100)) {
          onSwipe();
        }
      }}
      dragConstraints={{ left: 0, right: 0 }}
      className="absolute w-160 h-105 flex flex-col justify-center gap-7 text-white text-center p-20 rounded-[74px] shadow-xl cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: rotation(index),
      }}
      exit={{
        opacity: 0,
        y: -40,
        scale: 0.95,
        rotate: -30,
      }}
      transition={{
        type: 'spring',
        mass: 1,
        stiffness: 45,
        damping: 15,
      }}
      style={{
        zIndex: cards.length - index,
        backgroundColor: bgColor,
      }}
    >
      <h2 className="text-[32px] font-inter font-[700] text-left">{title}</h2>
      <div className="text-[20px] font-inter font-[500] text-left">{description}</div>
    </motion.div>
  );
};

export default function CardStack() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCardIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const getCard = (offset) => {
    const index = (cardIndex + offset) % cards.length;
    return {
      ...cards[index],
      bgColor: colors[index % colors.length],
    };
  };

  return (
    <div
      onClick={() => {
        if (!isAnimating) nextCard();
      }}
      className="relative w-[320px] h-[280px]"
    >
      <AnimatePresence mode="popLayout">
        {[2, 1, 0].map((i) => {
          const card = getCard(i);
          return (
            <Card
              key={`${card.title}-${cardIndex}-${i}`}
              {...card}
              index={2 - i}
              isTop={i === 0}
              onSwipe={nextCard}
              bgColor={card.bgColor}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
