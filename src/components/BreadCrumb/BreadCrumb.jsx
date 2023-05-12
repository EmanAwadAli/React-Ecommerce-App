import React from "react";
import { Link } from "react-router-dom";
import "./BreadCrumb.css";

export default function BreadCrumb({ items, activeTitle }) {
  return (
    <>
      <nav aria-label="breadcrumb" className="nav-breadcrumb">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <i className="fa-solid fa-house"></i> <Link to="/">Home</Link>
            </li>
            {items
              ? items.map((item, index) => (
                  <li className="breadcrumb-item" key={index}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))
              : ""}
            <li className="breadcrumb-item active" aria-current="page">
              {activeTitle?.split(" ").slice(0, 3).join(" ")}
            </li>
          </ol>
        </div>
      </nav>
    </>
  );
}
