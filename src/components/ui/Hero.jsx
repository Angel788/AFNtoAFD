import React, { useState, useEffect } from 'react';
import Automata1 from '../../assets/IMG/Automata/1.png';
import Automata2 from '../../assets/IMG/Automata/2.png';
import Automata3 from '../../assets/IMG/Automata/3.png';
import Automata4 from '../../assets/IMG/Automata/4.png';

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Automata1, Automata2, Automata3,Automata4];

  useEffect(() => {
    const interval = setInterval(() => {
      if((currentImageIndex + 1)==images.length)setInterval(()=>{},700);
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 1000); // Cambia la imagen cada 8 segundos

    return () => clearInterval(interval); 
  }, [currentImageIndex, images.length]);



  return (
    <div className="relative w-full" style={{ fontSize: 25, fontWeight: 'inherit', color: 'white', padding: '5px' }}>
      <div className="mx-auto flex flex-col items-center relative w-full">
        {/* Carrusel */}
        <div
          className="carousel-container w-full flex items-center justify-center"
          style={{ 
            overflow: 'hidden', 
            marginTop: '0',   
            marginLeft: '0',  
            marginRight: '0', 
            aspectRatio: '2732 / 840', 
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};