import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { Helmet } from "react-helmet";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import CategoryItem from "../CategoryItem/CategoryItem";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // Get All Categries
  const getAllCategories = async () => {
    await axios(`${baseUrl}/categories`)
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <section className="categories pb-5">
        <BreadCrumb activeTitle="Categories" />
        <div className="container">
          {categories.length > 0 ? (
            <div className="row">
              {categories.map((category) => (
                <div className="col-md-3 mb-4" key={category._id}>
                  <CategoryItem category={category} />
                </div>
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </>
  );
}
