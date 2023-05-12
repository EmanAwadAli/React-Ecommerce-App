import React from "react";
import "./Pagination.css";
export default function Pagination({ pages, getPage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <span
              className="page-link cursor-pointer"
              onClick={() => getPage(page)}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
