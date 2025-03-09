import React from 'react';
import { Link } from 'react-router-dom';
import './Slider.css'; // Importamos el archivo CSS

const Slider = () => {
  return (
    <header className="slider-header">
      <div className="slider-container"> 
        <nav className="slider-nav">
          {[
            { name: 'Nueva Orden', path: '/' },
            { name: 'Lista ordenes', path: '/list' },
          ].map((item) => (
            <Link key={item.name} to={item.path} className="menu-item">
              <span className="gold-gradient">{item.name}</span>
              <span className="menu-underline"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Slider;
