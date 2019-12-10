import React, { useEffect } from 'react';
import '../style/component/sliderShow.scss';

const SliderShow = () => {
  useEffect(() => {
    carousel();
  });

  const carousel = () => {
    let slideIndex = 0;
    handleCarousel();

    function handleCarousel() {
      let i;
      let elements = document.getElementsByClassName('slider');
      for (i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
      slideIndex++;
      if (slideIndex > elements.length) {
        slideIndex = 1;
      }
      elements[slideIndex - 1].style.display = 'block';
      setTimeout(handleCarousel, 2000);
    }
  };

  return (
    <div className="container-slider">
      <div className="slider">
        <img className="image-slider" alt="" src="/images/slider1.png" />
        Find a tutor near you
      </div>
      <div className="slider">
        <img className="image-slider" alt="" src="/images/slider2.jpg" />
        You tap, we tutor
      </div>
      <div className="slider">
        <img className="image-slider" alt="" src="/images/slider3.png" />
        Learn today - Succeed tomorrow
      </div>
      <div className="slider">
        <img className="image-slider" alt="" src="/images/slider4.jpg" />
        Fair Price
      </div>
      <div className="slider">
        <img className="image-slider" alt="" src="/images/slider5.jpeg" />A
        digital solution for learning
      </div>
    </div>
  );
};

export default SliderShow;
