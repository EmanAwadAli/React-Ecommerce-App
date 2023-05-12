import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { baseUrl } from "./../../utils/baseUrl";
import axios from "axios";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import ProductItem from "../ProductItem/ProductItem";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  let pages = new Array(numberOfPages).fill(1).map((page, index) => index + 1);

  // Get Products
  async function getProducts(page) {
    let response = await axios
      .get(`${baseUrl}/products?limit=12&page=${page}`)
      .catch((error) => console.log(error));
    if (response.status === 200) {
      setProducts(response.data.data);
      setNumberOfPages(response.data.metadata.numberOfPages);
    }
  }

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="all_products pb-5">
        <BreadCrumb activeTitle="Products" />
        <div className="container">
          {products.length > 0 ? (
            <div className="row">
              {products.map((product) => (
                <div
                  className="col-6 col-md-4 col-lg-3 mb-3 mb-sm-4"
                  key={product._id}
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
          <Pagination pages={pages} getPage={getProducts} />
        </div>
      </div>
    </>
  );
}
