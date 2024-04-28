import React from "react";

import Categories from "../components/Home/Categories";

import Products from "../components/Home/Products";
import Banner from "../components/Home/Banner";
import Trend from "../components/Home/Trend";
import Discount from "../components/Home/Discount";
import Services from "../components/Home/Services";
import Instagram from "../components/Home/Instagram";
const Home = () => {
  return (
    <>
      <Categories />
      <Products />
      <Banner />
      {/* <Trend /> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <Discount />
      <Services />
      <Instagram />
    </>
  );
};
export default Home;
