import React from "react";
import { Link } from "react-router-dom";
import CopyRights from "../CopyRights/CopyRights";
import logo from "../../assets/images/logo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <div className="footer-links custom-padding">
        <div className="container">
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3">
              <div>
                <h3 className="title">Links</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/">Products</Link>
                  </li>
                  <li>
                    <Link to="/">Brands</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <div>
                <h3 className="title">Links</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/">Products</Link>
                  </li>
                  <li>
                    <Link to="/">Brands</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md-3">
              <div>
                <h3 className="title">Links</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/">Products</Link>
                  </li>
                  <li>
                    <Link to="/">Brands</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-logo">
                <img src={logo} alt="ajeeb" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CopyRights />
    </footer>
  );
}
