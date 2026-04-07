import { motion } from 'motion/react';

const Typewriter = ({ text, delay = 0.05, startDelay = 0 }) => {
  const letters = Array.from(text);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: startDelay },
    },
  };

  const childVariants = {
    visible: {
      opacity: 1,
      display: "inline-block",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 0
      },
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  return (
    <motion.div
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Typewriter;