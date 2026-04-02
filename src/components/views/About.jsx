import React, { useState } from 'react';
import TextBox from '../canvas/TextBox';
import Typewriter from '../ui/Typewriter';
import portraitImg from '../../assets/portrait.jpg'
import awsCertImg from '../../assets/awsCert.png'
import './About.css';

const About = ({ onBack }) => {
    const [visibleBoxes, setVisibleBoxes] = useState({
        introduction: true,
        interests: true,
        certified: true,
        awsCert: true,
        experience1: true,
        experience2: true
    });
    const handleHideBox = (id) => {
        setVisibleBoxes(prev => {
            const newState = { ...prev, [id]: false };
            if (id === 'experience2') {
                setTimeout(() => {
                    if (onBack) onBack();
                }, 200); 
            }
            return newState;
        });
    };
    const wave1Finished = !visibleBoxes.introduction;
    const wave2Finished = !visibleBoxes.interests && !visibleBoxes.certified && !visibleBoxes.awsCert;

    return (
        <div className="about-content">
            <img src={portraitImg} alt="Dylan Portrait" className="about-portrait" />
            <div className="about-text-container">
                {/* --- WAVE 1 --- */}
                {visibleBoxes.introduction && (
                    <TextBox onClick={() => handleHideBox('introduction')}>
                        <h1><Typewriter text={"Hello there, I'm Dylan, a full-stack and IoT Software Engineer based in Singapore."} delay={0.04} startDelay={0.5}/></h1>
                    </TextBox>
                )}
                {wave1Finished && (
                    <>
                        {visibleBoxes.interests && (
                            <TextBox onClick={() => handleHideBox('interests')}>
                                <h2><Typewriter text={"I'm passionate about technology and the cloud, and..."} delay={0.04} startDelay={1}/></h2>
                            </TextBox>
                        )}
                        {visibleBoxes.certified && (
                            <TextBox onClick={() => handleHideBox('certified')}>
                                <h2><Typewriter text={"I'm also AWS Cloud Practitioner certified."} delay={0.04} startDelay={3}/></h2>
                            </TextBox>
                        )}
                        {visibleBoxes.awsCert && (
                            <TextBox 
                            className="invisible-box" 
                            onClick={() => handleHideBox('awsCert')}
                            >
                            <img src={awsCertImg} alt="AWS Certificate" className="about-aws-cert" />
                            </TextBox>
                        )}
                    </>
                )}
                {wave2Finished && (
                    <>
                        {visibleBoxes.experience1 && (
                            <TextBox onClick={() => handleHideBox('experience1')}>
                                <h2><Typewriter text={"I have experience as a developer in AWS (Serverless), Docker, Kubernetes, React, DotNet, and Relational Databases."} delay={0.025} startDelay={1}/></h2>
                            </TextBox>
                        )}
                        {visibleBoxes.experience2 && (
                            <TextBox onClick={() => handleHideBox('experience2')}>
                                <h2><Typewriter text={"I also built a Kubernetes pipeline to automate testing, deployment and monitoring of an application for key stakeholders."} delay={0.025} startDelay={3}/></h2>
                            </TextBox>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default About;