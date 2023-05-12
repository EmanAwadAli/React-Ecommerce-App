import React, { useEffect, useState } from "react";
import { baseUrl } from "./../../utils/baseUrl";
import axios from "axios";
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  // Get Products
  async function getProducts() {
    await axios
      .get(`${baseUrl}/products?sort=-sold&limit=30`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => console.log(error));
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
    <div className="bestseller custom-padding pt-0">
      <div className="container">
        <h2 className="common-title common-title2">
          <span>BestSeller</span> Products
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
