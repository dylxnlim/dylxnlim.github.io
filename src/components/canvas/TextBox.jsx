import React from 'react';
import './TextBox.css';

const TextBox = ({ children, className = "", onClick }) => {
    const handleClick = (e) => {
        e.stopPropagation();
        console.log("Click");
        if(onClick) onClick();
    };
    return (
    <button onClick={handleClick} className={`gb-text-box ${className}`}>
        {children}
    </button>
    );
};

export default TextBox;