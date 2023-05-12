import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { Helmet } from "react-helmet";
import ProductItem from "../ProductItem/ProductItem";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import Loading from "../Loading/Loading";

export default function CategoryDetails() {
  const [categoryDetails, setCategoryDetails] = useState({});

  const [products, setProducts] = useState([]);
  let { id } = useParams();

  // Get Category Details
  async function getCategoryDetails() {
    await axios
      .get(`${baseUrl}/categories/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setCategoryDetails(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }

  // Get Products
  async function getProducts() {
    let response = await axios
      .get(`${baseUrl}/products?category=${id}`)
      .catch((error) => console.log(error));
    if (response.status === 200) {
      setProducts(response.data.data);
    }
  }

  useEffect(() => {
    getCategoryDetails();
    getProducts();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{categoryDetails.name}</title>
      </Helmet>
      <div className="category-details pb-5">
        <BreadCrumb
          items={[
            {
              path: "/categories",
              title: "Categories",
            },
          ]}
          activeTitle={categoryDetails.name}
        />
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  className="col-6 col-md-4 col-lg-3 mb-3 mb-sm-4"
                  key={product._id}
                >
                  <ProductItem product={product} />
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
