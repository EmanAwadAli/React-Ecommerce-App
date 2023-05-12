import React from "react";
import { Helmet } from "react-helmet";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="not-found py-5">
        <div className="container">
          <h2 className="title"> Page Not Found</h2>
        </div>
      </div>
    </>
  );
}
