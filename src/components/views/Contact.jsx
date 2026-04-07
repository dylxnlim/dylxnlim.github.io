import React, { useState } from 'react';
import TextBox from '../canvas/TextBox';
import Typewriter from '../ui/Typewriter';
import portraitImg from '../../assets/portrait.jpg'
import './Contact.css';

const Contact = ({ onBack }) => {
    const [visibleBoxes, setVisibleBoxes] = useState({
        contactInfo: true
    });
    const handleHideBox = (id) => {
        setVisibleBoxes(prev => {
            const newState = { ...prev, [id]: false };
            if (id === 'contactInfo') {
                setTimeout(() => {
                    if (onBack) onBack();
                }, 200); 
            }
            return newState;
        });
    };

    return (
        <div className="contact-content">
            <img src={portraitImg} alt="Dylan Portrait" className="contact-portrait" />
            <div className="contact-text-container">
                {/* --- WAVE 1 --- */}
                {visibleBoxes.contactInfo && (
                    <TextBox onClick={() => handleHideBox('contactInfo')}>
                        <h1><Typewriter text={"[Handphone]"} delay={0.07} startDelay={1}/></h1>
                        <h1 style={{ fontFamily: "SFPro"}}>
                           <Typewriter text={"+65 97335068"} delay={0.07} startDelay={2}/>
                        </h1>
                        <br></br>
                        <h1><Typewriter text={"[Email]"} delay={0.07} startDelay={3}/></h1>
                        <h1 style={{ fontFamily: "SFPro"}}>
                            <Typewriter text={"dylxnlim@gmail.com"} delay={0.07} startDelay={4}/>
                        </h1>
                    </TextBox>
                )}
            </div>
        </div>
    );
};

export default Contact;