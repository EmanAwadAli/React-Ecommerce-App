import React from "react";
import { Helmet } from "react-helmet";
import MainSlider from "../components/MainSlider/MainSlider";
import CategoriesSlider from "./../components/CategoriesSlider/CategoriesSlider";
import ProductsSlider from "../components/ProductsSlider/ProductsSlider";
import BestSeller from "../components/BestSeller/BestSeller";
import Brands from "../components/Brands/Brands";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <ProductsSlider />
      <BestSeller />
      <Brands />
    </>
  );
}
