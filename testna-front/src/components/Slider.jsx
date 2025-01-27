import React from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
  const goldGradientStyle = {
    background: 'black',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    fontSize: 'x-large',
  };

  const menuItemStyle = "relative hover:text-[#e8c500] group";
  const menuItemUnderlineStyle = "absolute bottom-0 left-0 w-full h-0.5 bg-[#88600a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out";

  return (
    <header className="flex flex-col items-center py-2 px-2">
      <div className="flex justify-end items-center w-full px-4"> 
        <nav className="text-letter text-xl space-y-4 sm:space-y-0 sm:space-x-12 flex flex-col sm:flex-row">
          {[
            { name: 'Nueva Orden', path: '/' },
            { name: 'Lista ordenes', path: '/list' },
          ].map((item) => (
            <Link key={item.name} to={item.path} className={`${menuItemStyle} text-right`}>
              <span style={goldGradientStyle}>{item.name}</span>
              <span className={menuItemUnderlineStyle}></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Slider;