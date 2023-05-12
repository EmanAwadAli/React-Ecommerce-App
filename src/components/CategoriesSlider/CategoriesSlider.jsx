import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import Slider from "react-slick";
import CategoryItem from "../CategoryItem/CategoryItem";
import Loading from "../Loading/Loading";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  // Get All Categries
  const getAllCategories = async () => {
    await axios(`${baseUrl}/categories`)
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="categories custom-padding">
        <div className="container">
          <h2 className="common-title common-title2">
            <span>Our</span> Categories
          </h2>
          {categories.length > 0 ? (
            <Slider {...settings}>
              {categories.map((category) => (
                <CategoryItem category={category} key={category._id} />
              ))}
            </Slider>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </>
  );
}
