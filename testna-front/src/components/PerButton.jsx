import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import './PerButton.css';

const PerButton = ({ text = null, Icon = null, onClick, type = "button", loading = false, bg = "transparent" }) => {
  const defaultBorderColor = '#a37d23';
  const [hover, setHover] = useState(false);

  return (
    <button
      type={type}
      className="per-button"
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderColor: bg !== "transparent" ? bg : defaultBorderColor,
        color: 'white', 
        backgroundColor: hover ? (bg !== "transparent" ? bg : defaultBorderColor) : 'transparent'
      }}
    >
      {Icon && (
        <IconContext.Provider
          value={{
            size: '1.5em',
            color: 'white', 
          }}
        >
          <Icon className={text ? 'icon icon-with-text' : 'icon icon-alone'} />
        </IconContext.Provider>
      )}
      {text && <span className="text-content">{text}</span>}
    </button>
  );
};

export default PerButton;
