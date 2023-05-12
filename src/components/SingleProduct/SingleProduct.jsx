import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { CartContext } from "../Context/CartContext";
import { notify } from "../../utils/notify";
import { baseUrl } from "../../utils/baseUrl";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import "./SingleProduct.css";

export default function SingleProduct() {
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart, setCartCount } = useContext(CartContext);
  let { id } = useParams();

  let [nav1, setNav1] = useState(null);
  let [nav2, setNav2] = useState(null);

  // Add Product To Cart
  async function addProductToCartHandler(id) {
    let token = localStorage.getItem("userToken");
    if (token) {
      let response = await addToCart(token, id);
      if (response.status === 200) {
        notify("Product added successfully to you cart", "success");
        setCartCount(response.data.numOfCartItems);
      }
    } else {
      notify("You are not logged in. Please login to get access", "error");
    }
  }

  // Get Product Details
  async function getProductDetails() {
    await axios
      .get(`${baseUrl}/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProductDetails(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  // Product Gallery Slider Settings
  let sliderSettings = {
    asNavFor: nav2,
    ref: (slider1) => setNav1(slider1),
    arrows: false,
  };

  // Product Gallery Slider Nav Settings
  let sliderNavSettings = {
    asNavFor: nav1,
    ref: (slider2) => setNav2(slider2),
    slidesToShow: 6,
    swipeToSlide: true,
    focusOnSelect: true,
    vertical: true,
    infinite: false,
    arrows: false,
  };

  return (
    <>
      <Helmet>
        <title>Product details</title>
      </Helmet>
      <div className="product-details pb-5">
        <BreadCrumb
          items={[
            {
              path: "/products",
              title: "Products",
            },
          ]}
          activeTitle={`${productDetails?.title}`}
        />
        <div className="container">
          {productDetails ? (
            <div className="row">
              <div className="col-md-5">
                <div className="product-images">
                  <Slider className="slider-nav" {...sliderNavSettings}>
                    {productDetails?.images?.map((img, index) => (
                      <div className="item" key={index}>
                        <img src={img} alt="" className="img-fluid" />
                      </div>
                    ))}
                  </Slider>
                  <Slider className="slider" {...sliderSettings}>
                    {productDetails?.images?.map((img, index) => (
                      <div className="image" key={index}>
                        <img src={img} alt="" className="img-fluid" />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="col-md-7">
                {/* Details */}
                <div className="details">
                  <h2 className="title">{productDetails.title}</h2>
                  <p className="rating">
                    <i className="fa-solid fa-star text-warning me-1"></i>
                    {productDetails.ratingsAverage}
                  </p>
                  <p className="desc">{productDetails.description}</p>
                  <p className="price">
                    {productDetails.price}
                    <strong className="currency"> EGP</strong>
                  </p>
                  <button
                    className="add btn add"
                    onClick={() => addProductToCartHandler(productDetails._id)}
                  >
                    <i className="fa-solid fa-cart-shopping me-2"></i>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
