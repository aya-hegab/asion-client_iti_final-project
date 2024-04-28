import HeaderDelivary from "./HeaderDelivary";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const DelivaryLayout = () => {
  return (
    <>
      <HeaderDelivary />

      <Outlet />

      {/* <Footer /> */}
    </>
  );
};

export default DelivaryLayout;
