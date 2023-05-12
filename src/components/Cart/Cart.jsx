import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { notify } from "../../utils/notify";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const {
    getUserCart,
    setCartCount,
    updateCartQuantity,
    removeProduct,
    clearCart,
  } = useContext(CartContext);
  let token = localStorage.getItem("userToken");

  // Get User Cart
  async function getUserCartHandler() {
    if (token) {
      let response = await getUserCart(token);
      if (response.status === 200) {
        setProducts(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      }
    }
  }

  // Update Cart Quanitiy
  async function updateCartQtyHandler(id, count) {
    if (token) {
      let response = await updateCartQuantity(id, count, token);
      if (response.status === 200) {
        setProducts(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
      }
    }
  }

  // Remove Product From Cart
  async function removeProductHandler(id) {
    if (token) {
      let response = await removeProduct(id, token);
      if (response.status === 200) {
        notify("Product is deleted successfully", "success");
        setProducts(response.data.data.products);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartCount(response.data.numOfCartItems);
      }
    }
  }

  // Clear Cart
  async function clearCartHandler() {
    if (token) {
      let response = await clearCart(token);
      if (response.data.message === "success") {
        setProducts([]);
        setTotalPrice(0);
        setCartCount(0);
        notify("Success", "success");
      }
    }
  }

  useEffect(() => {
    getUserCartHandler();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="cart pb-5">
        <BreadCrumb activeTitle="Cart" />
        <div className="container">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <div className="cart-item border" key={product.product.id}>
                  {/* Image */}
                  <Link
                    to={`/products/${product.product.id}`}
                    className="image"
                  >
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="img-fluid"
                    />
                  </Link>
                  {/* Details */}
                  <div className="details p-3">
                    <div>
                      <h3 className="title">
                        <Link to={`/products/${product.product.id}`}>
                          {product.product.title
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </Link>
                      </h3>
                      <p className="price mb-1">
                        {product.price} <strong>EGP</strong>
                      </p>
                      <span className="d-block mb-1">
                        <label>Count: </label>
                        {product.count}
                      </span>
                      <div className="quantity">
                        <label className="me-2">Qty: </label>
                        <select
                          name="qty"
                          id="qty"
                          className="p-2"
                          onChange={(e) =>
                            updateCartQtyHandler(
                              product.product.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="btn delete"
                      onClick={() => removeProductHandler(product.product.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <p>Total price : {totalPrice} EGP</p>
              <div className="d-flex justify-content-between">
                <Link className="btn btn-success" to="/checkout">
                  Checkout
                </Link>
                <button className="btn btn-danger" onClick={clearCartHandler}>
                  Clear Cart
                </button>
              </div>
            </>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
}
