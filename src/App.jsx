import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, useScroll } from '@react-three/drei'
import Gameboy from './components/canvas/Gameboy'
import PixelTransition from './components/ui/PixelTransition'
import TextBox from './components/canvas/TextBox'
import Typewriter from './components/ui/Typewriter'
import './App.css'

export default function App() {
  const [zoomed, setZoomed] = useState(false);
  const [isReadyForPixelTransition, setIsReadyForPixelTransition] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState({
    portfolio: true,
    instruction: true,
    aboutMe: true,
    contact: true
  });
  const wave1Finished = !visibleBoxes.portfolio && !visibleBoxes.welcome;
  
  //Methods
  const handleZoomBegin = (e) => {
    if (zoomed) return;
    setZoomed(true);
  };
  const handleZoomComplete = () => {
    setIsReadyForPixelTransition(true);
  };
  const handleHideBox = (id) => {
    setVisibleBoxes(prev => ({
      ...prev,
      [id]: false
    }));
  };

  return (
    <div className="app-container">
      {/* The 3D World */}
      <Canvas 
        shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        
        <Suspense fallback={null}>
          <Gameboy 
            zoomed={zoomed}
            onZoomComplete={handleZoomComplete}
            onClick={handleZoomBegin} 
          />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} />
        </Suspense>
      </Canvas>
      <PixelTransition isVisible={isReadyForPixelTransition} />
      {/* The 2D UI Overlay (Only shows when zoomed) */}
      {isReadyForPixelTransition && (
        <div className="ui-overlay">
          <div className="screen-content">
            {/* --- WAVE 1 --- */}
            {visibleBoxes.portfolio && (
              <TextBox onClick={() => handleHideBox('portfolio')}>
                <h1><Typewriter text={"My Portfolio"} delay={0.1} startDelay={1.2}/></h1>
              </TextBox>
            )}
            {visibleBoxes.instruction && (
              <TextBox onClick={() => handleHideBox('instruction')}>
                <span><Typewriter text={"Welcome to the site. Click on the text boxes to proceed!"} delay={0.05} startDelay={2}/></span>
              </TextBox>
            )}
            {/* --- WAVE 2 --- */}
            {wave1Finished && (
            <>
              {visibleBoxes.aboutMe && (
                <TextBox onClick={() => handleHideBox('aboutMe')}>
                  <h1><Typewriter text={"About Me"} startDelay={0.2}/></h1>
                </TextBox>
              )}

              {visibleBoxes.contact && (
                <TextBox onClick={() => handleHideBox('contact')}>
                  <h1><Typewriter text={"Get in touch?"} startDelay={0.5}/></h1>
                </TextBox>
              )}
            </>
          )}
          </div>
        </div>
      )}
    </div>
  )
}