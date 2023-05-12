import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  // Get Brands
  async function getBrands() {
    await axios
      .get(`${baseUrl}/brands`)
      .then((response) => {
        if (response.status === 200) {
          setBrands(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getBrands();
  }, []);

  // Brands Slider Settings
  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
    ],
  };

  return (
    <section className="brands custom-padding pt-0 py-4">
      <div className="container">
        <h2 className="common-title">
          <span>Our</span> Brands
        </h2>
        {brands.length > 0 ? (
          <Slider {...settings}>
            {brands.map((brand) => (
              <div className="item" key={brand._id}>
                <div className="image">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
