import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import TextBox from '../canvas/TextBox';
import './PortfolioCarousel.css';

const PortfolioCarousel = ({ items, onSelect }) => {
  const [index, setIndex] = useState(0);
  const DRAG_THRESHOLD = 50;

  const onDragEnd = (e, info) => {
    if (info.offset.x > DRAG_THRESHOLD && index > 0) {
      setIndex(index - 1);
    } else if (info.offset.x < -DRAG_THRESHOLD && index < items.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="carousel-window">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        animate={{ x: `calc(-${index * 100}% )` }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
        className="carousel-track"
      >
        {items.map((item, i) => (
          <div key={item.id} className="carousel-item">
            <motion.div 
              className="card-container"
              animate={{ 
                scale: i === index ? 1 : 0.8,
                opacity: i === index ? 1 : 0.4
              }}
              onClick={() => i === index && onSelect(item)}
            >
              {/* Square Icon */}
              <div className="items-icon-box">
                <img src={item.icon} alt={item.title} className="items-pixel-icon" />
              </div>
              
              <TextBox className="items-title-box">
                {item.title}
              </TextBox>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioCarousel;