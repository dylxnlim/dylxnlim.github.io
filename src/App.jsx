import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, useScroll } from '@react-three/drei'
import Gameboy from './components/canvas/Gameboy'
import PixelTransition from './components/ui/PixelTransition'
import TextBox from './components/canvas/TextBox'
import Typewriter from './components/ui/Typewriter'
import About from './components/views/About'
import Portfolio from './components/views/Portfolio'
import Contact from './components/views/Contact'
import './App.css'

export default function App() {
  const [zoomed, setZoomed] = useState(false);
  const [isReadyForPixelTransition, setIsReadyForPixelTransition] = useState(false);
  const [transitionState, setTransitionState] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState({
    portfolio: true,
    instruction: true
  });
  const [currentView, setCurrentView] = useState('menu');
  const wave1Finished = !visibleBoxes.portfolio && !visibleBoxes.instruction;
  
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
    const handleMenuClick = (viewName) => {
    // Fade out menu, then set the new view
    setCurrentView(viewName);
    setTransitionState(true);
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
                <h1><Typewriter text={"Dylan's Portfolio"} delay={0.08} startDelay={1.2}/></h1>
              </TextBox>
            )}
            {visibleBoxes.instruction && (
              <TextBox onClick={() => handleHideBox('instruction')}>
                <span><Typewriter text={"Welcome to the site. Click on the text boxes to proceed!"} delay={0.02} startDelay={2.4}/></span>
              </TextBox>
            )}
            {/* --- WAVE 2 --- */}
            {wave1Finished && currentView === 'menu' && (
              <>
                <TextBox onClick={() => handleMenuClick('about')}>
                  <h1><Typewriter text={"About Me"} delay={0.08} startDelay={1}/></h1>
                </TextBox>
                <TextBox onClick={() => handleMenuClick('portfolio')}>
                  <h1><Typewriter text={"My Projects"} delay={0.08} startDelay={1}/></h1>
                </TextBox>
                <TextBox onClick={() => handleMenuClick('contact')}>
                  <h1><Typewriter text={"Get in touch?"} delay={0.08} startDelay={1}/></h1>
                </TextBox>
              </>
            )}
            {/* --- Sub-Views --- */}
            {currentView === 'about' && <About onBack={() => setCurrentView('menu')} />}
            {currentView === 'portfolio' && <Portfolio onBack={() => setCurrentView('menu')} />}
            {currentView === 'contact' && <Contact onBack={() => setCurrentView('menu')} />}
          </div>
        </div>
      )}
    </div>
  )
}