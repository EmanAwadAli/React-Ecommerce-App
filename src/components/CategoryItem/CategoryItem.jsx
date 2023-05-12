import React from "react";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

export default function CategoryItem({ category }) {
  return (
    <Link to={`/categories/${category._id}`} className="d-block category-item">
      <div className="image">
        <img src={category.image} alt={category.name} className="img-fluid" />
      </div>
      <h3 className="title">{category.name}</h3>
    </Link>
  );
}
