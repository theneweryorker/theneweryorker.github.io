import './styles/DesktopApp.css'; // Import your global CSS file
import React, { useState } from 'react';
import WindowApp from './WindowApp';

const fullScreenStyles = {
    height: '100vh',
    width: '100vw',
    position: 'relative' as 'relative',
  };

function DesktopApp() {
const [showAxis, setShowAxis] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWriting, setShowWriting] = useState(false);

  return (
    <div className="desktop" style={fullScreenStyles}>
      <button className="desktopbutton" onClick={() => setShowAxis(true)}>Button 1</button>
      <button className="desktopbutton" onClick={() => setShowCalculator(true)}>Button 2</button> 
      <button className="desktopbutton" onClick={() => setShowWriting(true)}>Button 3</button>

      {/* {showAxis && <Axis setShowAxis={setShowAxis} />}
      {showCalculator && <Calculator setShowCalculator={setShowCalculator} />}
      {showWriting && <Writing setShowWriting={setShowWriting} />} */}
      {showAxis && <WindowApp component="axis" setIsOpen={setShowAxis} />}
      {showCalculator && <WindowApp component="calculator" setIsOpen={setShowCalculator} />}
      {showWriting && <WindowApp component="writing" setIsOpen={setShowWriting} />}
    </div>
  );
}

export default DesktopApp;