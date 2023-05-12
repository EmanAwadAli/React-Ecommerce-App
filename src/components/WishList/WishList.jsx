import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishlistContext";
import { notify } from "../../utils/notify";

export default function WishList() {
  const [wishList, setToWishList] = useState([]);
  const { getUserWishList, removeFromWishList, setWhishlistItemsCount } =
    useContext(WishListContext);
  const { addToCart, setCartCount } = useContext(CartContext);
  let token = localStorage.getItem("userToken");

  // Get User WishList
  async function getUserWishListHandler() {
    if (token) {
      let response = await getUserWishList(token);
      if (response.status === 200) {
        setToWishList(response.data.data);
      }
    }
  }

  // Remove Product From WishList
  async function removeFromWishListHandler(id) {
    if (token) {
      let response = await removeFromWishList(id, token);
      if (response.status === 200) {
        notify("Product removed successfully from your wishlist", "success");
        const updatedWishList = wishList.filter((product) => product.id !== id);
        setToWishList(updatedWishList);
        setWhishlistItemsCount(response.data.data.length);
      }
    }
  }

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

  useEffect(() => {
    getUserWishListHandler();
  }, []);

  return (
    <>
      <Helmet>
        <title>Whishlist</title>
      </Helmet>
      <div className="wishlist pb-5">
        <BreadCrumb activeTitle="Whishlist" />
        <div className="container">
          {wishList.length > 0 ? (
            <>
              {wishList.map((product) => (
                <div className="cart-item border" key={product.id}>
                  {/* Image */}
                  <Link to={`/products/${product.id}`} className="image">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="img-fluid"
                    />
                  </Link>
                  {/* Details */}
                  <div className="details p-3">
                    <div>
                      <h3 className="title">
                        <Link to={`/products/${product.id}`}>
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </Link>
                      </h3>
                      <p className="mb-1">
                        <i className="fa-solid fa-star text-warning me-1"></i>
                        {product.ratingsAverage}
                      </p>
                      <p className="price mb-2">
                        {product.price} <strong>EGP</strong>
                      </p>
                      <button
                        className="add btn"
                        onClick={() => addProductToCartHandler(product.id)}
                      >
                        <i className="fa-solid fa-cart-shopping"></i> Add to
                        cart
                      </button>
                    </div>
                    <button
                      className="btn delete"
                      onClick={() => removeFromWishListHandler(product.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Your Wishliast is empty</p>
          )}
        </div>
      </div>
    </>
  );
}
