import React from "react";
import slide1 from "../../assets/images/mainslider/slide1.jpg";
import slide2 from "../../assets/images/mainslider/slide2.jpg";
import Slider from "react-slick";
import "./MainSlider.css";

export default function MainSlider() {
  // MainSlider Settings
  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="main-slider">
      <Slider {...settings}>
        <div className="item">
          <img src={slide1} alt="" className="img-fluid w-100" />
        </div>
        <div className="item">
          <img src={slide2} alt="" className="img-fluid w-100" />
        </div>
      </Slider>
    </section>
  );
}
