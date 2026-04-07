import React, { useState } from 'react';
import TextBox from '../canvas/TextBox';
import Typewriter from '../ui/Typewriter';
import { motion } from 'motion/react';
import './ProjectDetails.css'

const ProjectDetails = ({ project, onBack }) => {
    const [waveIndex, setWaveIndex] = useState(0);
    const [hiddenInWave, setHiddenInWave] = useState([]);

    const itemsPerWave = 2;
    const currentWaveItems = project.desc.slice(
        waveIndex * itemsPerWave,
        (waveIndex * itemsPerWave) + itemsPerWave
    );

    const handleHideBox = (indexInWave) => {
    const newHidden = [...hiddenInWave, indexInWave];
    setHiddenInWave(newHidden);

    if (newHidden.length === currentWaveItems.length) {
        // Small delay so the user sees the box disappear
        setTimeout(() => {
            setWaveIndex(prev => prev + 1);
            setHiddenInWave([]); // Reset
        }, 500);
        }
    };

    const totalWaves = Math.ceil(project.desc.length / itemsPerWave);
    const isFinished = waveIndex >= totalWaves;

  return (
    <div>
        <h1 className='details-header'>{isFinished ? "Quest Complete!" : "Tap relevant boxes to reveal more..."}</h1>
        <TextBox className="details-textbox">
            <strong>PROJECT 'QUEST' TITLE</strong>
            <br />
            <Typewriter text={project.title} delay={0.05} startDelay={0.5} />
        </TextBox>
        <TextBox className="details-textbox">
            <strong>SKILLS 'EQUIPMENT' REQUIRED</strong>
            <br />
            <Typewriter text={project.skills} delay={0.03} startDelay={1} />
        </TextBox>
        {!isFinished ? (
            currentWaveItems.map((text, i) => (
                !hiddenInWave.includes(i) && (
                    <TextBox 
                    key={`${waveIndex}-${i}`} 
                    onClick={() => handleHideBox(i)} 
                    className='project-desc'
                    >
                        {i === 0 && waveIndex === 0 && <div><strong>PROJECT 'QUEST' DETAILS:</strong><br></br></div>}
                        <strong>DESCRIPTION:</strong>
                        <br></br>
                        <Typewriter text={text} delay={0.02} startDelay={1} />
                    </TextBox>
                )
            ))
        ) : (
            <TextBox>
                <strong>ALL INTEL RETRIEVED. ✔︎</strong>
                <br />
                Ready for the next quest?
            </TextBox>
        )}
        <TextBox className="details-textbox" onClick={onBack}>
            <span>EXIT 'QUEST'</span>
        </TextBox>
    </div>
  );
};

export default ProjectDetails;