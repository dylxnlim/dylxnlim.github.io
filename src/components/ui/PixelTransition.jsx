import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './PixelTransition.css';

const getNumBlocks = (pixelWidthPercent) => {
    const { innerWidth, innerHeight } = window;
    const blockSize = (innerWidth * pixelWidthPercent) / 100;
    return {
        numBlocks: Math.ceil(innerHeight / blockSize),
        numOfCols: Math.ceil(100 / pixelWidthPercent),
    };
};

const PixelTransition = ({ isVisible }) => {
    const pixelWidthPercent = 5;
    const delayMultiplier = 0.015;

    // Use useMemo so we dont calculate grid math on every frame
    const { numBlocks, numOfCols } = useMemo(() => getNumBlocks(pixelWidthPercent), []);

    const pixelVariants = {
        initial: { opacity: 0 },
        enter: (delayIndex) => ({
            opacity: 1,
            transition: {
                delay: delayIndex * delayMultiplier,
                duration: 0, 
            },
        }),
        exit: (delayIndex) => ({
            opacity: 0,
            transition: {
                delay: delayIndex * delayMultiplier,
                duration: 0,
            }
        })
    };

    const shuffle = (array) => {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="pixel-container">
                    {[...Array(numOfCols)].map((_, colIndex) => {
                        const blockIndices = shuffle([...Array(numBlocks)].map((_, i) => i));
                        
                        return (
                            <div key={colIndex} className="pixel-column" style={{ width: `${pixelWidthPercent}vw` }}>
                                {blockIndices.map((delayVal, blockIndex) => (
                                    <motion.div
                                        key={blockIndex}
                                        variants={pixelVariants}
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                        custom={delayVal}
                                        className="pixel-block"
                                        style={{ height: `${pixelWidthPercent}vw` }}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </AnimatePresence>
    );
};

export default PixelTransition;