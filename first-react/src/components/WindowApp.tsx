import './styles/WindowApp.css'; // Import your global CSS file
import React, { useState } from 'react';
import Writing from './Writing';
import Calculator from './Calculator';
import Axis from './Axis';

// Axis.tsx
interface WindowAppProps {
  setIsOpen: (show: boolean) => void;
  component: string;
}

function WindowApp({ setIsOpen, component }: WindowAppProps) {

  let windowStyles = {};

  if (component === "axis") {
    windowStyles = {
      width: "20em",
      height: "15em",
      top: "20%",
      left: "30%",
    };
  }

  if (component === "calculator") {
    windowStyles = {
      width: "20em",
      height: "12em",
      top: "4%",
      left: "50%",
    };
  }

  if (component === "writing") {
    windowStyles = {
      width: "15em",
      height: "27em",
      top: "12%",
      left: "10%",
    };
  }



  return (
    <div className="window" style={windowStyles}>
        <button className="windowbutton" onClick={() => setIsOpen(false)}><span className="window-icon">x</span></button>
      <div className="windowbody">
        {component == "axis" && <Axis />}
        {component == "calculator" && <Calculator />}
        {component == "writing" && <Writing />}
      </div>
    </div>
  );
}

export default WindowApp;