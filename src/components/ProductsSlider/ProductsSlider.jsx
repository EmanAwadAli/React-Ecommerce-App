import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "./../../utils/baseUrl";
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);

  // Get Products
  async function getProducts() {
    let response = await axios
      .get(`${baseUrl}/products?limit=30`)
      .catch((error) => console.log(error));
    if (response.status === 200) {
      setProducts(response.data.data);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="all-products custom-padding pt-0">
      <div className="container">
        <h2 className="common-title">
          <span>Our</span> Products
        </h2>
        {products.length > 0 ? (
          <Slider {...settings}>
            {products.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </Slider>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
