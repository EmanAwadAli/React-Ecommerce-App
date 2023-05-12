import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishlistContext";
import { notify } from "../../utils/notify";
import "./ProductItem.css";

export default function ProductItem({ product }) {
  const { _id, imageCover, title, price, ratingsAverage, category } = product;
  const { addToCart, setCartCount } = useContext(CartContext);
  const { addToWishList, setWhishlistItemsCount } = useContext(WishListContext);
  let token = localStorage.getItem("userToken");

  // Add Product To Cart
  async function addProductToCartHandler(id) {
    if (token) {
      let response = await addToCart(token, id);
      if (response.status === 200) {
        setCartCount(response.data.numOfCartItems);
        notify("Product added successfully to your cart", "success");
      }
    } else {
      notify("You are not logged in. Please login to get access", "error");
    }
  }

  // Add Product To WishList
  async function addProductToWishListHandler(id) {
    if (token) {
      let response = await addToWishList(id, token);
      if (response.status === 200) {
        setWhishlistItemsCount(response.data.data.length);
        notify("Product added successfully to your wishlist", "success");
      }
    } else {
      notify("You are not logged in. Please login to get access", "error");
    }
  }
  return (
    <div className="product-item">
      <Link to={`/products/${_id}`}>
        {/* Image */}
        <div className="image">
          <img src={imageCover} alt={title} className="img-fluid" />
        </div>
        {/* Details */}
        <div className="details">
          {/* <span>{category.name}</span> */}
          <h3 className="title">{title.split(" ").slice(0, 2).join(" ")}</h3>
          <div className="d-flex justify-content-between">
            <span className="price">
              {price} <strong className="currency">EGP</strong>
            </span>
            <span className="rating">
              <i className="fa-solid fa-star text-warning"></i> {ratingsAverage}
            </span>
          </div>
        </div>
      </Link>
      <div className="btns-group">
        <button
          className="add btn w-50"
          onClick={() => addProductToCartHandler(_id)}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <button
          className="add btn w-50"
          onClick={() => addProductToWishListHandler(_id)}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  );
}
