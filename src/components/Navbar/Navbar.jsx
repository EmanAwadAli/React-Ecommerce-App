import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishlistContext";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const [categories, setCategories] = useState([]);
  const { cartCount } = useContext(CartContext);
  const { whishlistItemsCount } = useContext(WishListContext);
  let navigate = useNavigate();

  // Get Categories
  const getCategories = async () => {
    await axios(
      `${baseUrl}/categories?slug=men's-fashion&slug=women's-fashion&slug=electronics`
    )
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  // LogOut Handler
  function logOutHandler() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand d-flex" to="/">
          <img src={logo} alt="ajeeb" className="img-fluid" />
        </Link>
        <ul className="navbar-nav mob-list ms-auto d-flex d-lg-none">
          {user ? (
            <>
              <li className="nav-item me-2">
                <NavLink className="nav-link position-relative" to="/wishlist">
                  <i className="fa-solid fa-heart fa-lg ms-1"></i>
                  <span className="position-absolute top-1 start-100 translate-middle badge bg-main">
                    {whishlistItemsCount}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link position-relative" to="/cart">
                  <i className="fa-solid fa-cart-shopping fa-lg ms-1"></i>
                  <span className="position-absolute top-1 start-100 translate-middle badge bg-main2">
                    {cartCount}
                  </span>
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav main-list">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category._id}>
                <NavLink
                  className="nav-link"
                  to={`/categories/${category._id}`}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav right-list ms-auto">
            {user ? (
              <>
                <li className="nav-item me-2 d-none d-lg-block">
                  <NavLink
                    className="nav-link position-relative"
                    to="/wishlist"
                  >
                    <i className="fa-solid fa-heart fa-lg ms-1"></i>
                    <span className="position-absolute top-1 start-100 translate-middle badge bg-main">
                      {whishlistItemsCount}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item me-3 d-none d-lg-block">
                  <NavLink className="nav-link position-relative" to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-lg ms-1"></i>
                    <span className="position-absolute top-1 start-100 translate-middle badge bg-main2">
                      {cartCount}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={logOutHandler}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
