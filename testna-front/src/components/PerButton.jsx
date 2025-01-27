import React, { useState } from 'react';
import { IconContext } from 'react-icons';

const PerButton = ({ text = null, Icon = null, onClick, type = "button", loading = false, bg = "transparent" }) => {
  const defaultBorderColor = '#a37d23';
  const [hover, setHover] = useState(false);

  return (
    <button
      type={type}
      className={`py-2 px-4 flex items-center justify-center rounded-lg w-full border-2
      transition-colors duration-300 ease-in-out`}
      onClick={onClick}
      disabled={loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderColor: bg !== "transparent" ? bg : defaultBorderColor,
        color: hover ? 'white' : (bg !== "transparent" ? bg : defaultBorderColor),
        backgroundColor: hover ? (bg !== "transparent" ? bg : defaultBorderColor) : 'transparent'
      }}
    >
      {Icon && (
        <IconContext.Provider
          value={{
            size: '1.5em',
            color: hover ? 'white' : (bg !== "transparent" ? bg : defaultBorderColor),
          }}
        >
          <Icon className={`${text ? 'mr-4' : 'mx-auto'}`} />
        </IconContext.Provider>
      )}
      {text && (
        <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {text}
        </span>
      )}
    </button>
  );
};

export default PerButton;
