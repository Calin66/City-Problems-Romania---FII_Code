import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {slides.map((slide, index) => {
        if (slide.includes("mp4")){
          return (
            // <div
            // className={index === current ? 'slide active' : 'slide'}
            // key={index}
            // >
            <div key={index} className="slidev">
            {index === current && (
              <video controls width="250" className='video-vp'>
                <source src={slide} type="video/mp4"></source>
              </video>
              )}
            </div>
          );
        }
        else {
          return (
            <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
            >
            {index === current && (
              <img src={slide} className='image' />
              )}
            </div>
          );
        }
      })}
    </section>
  );
};

export default ImageSlider;