
import HeaderVendor from "./HeaderVendor";

import Footer from './Footer';
import { Outlet } from "react-router-dom";
const VendorLayout = () => {

    return (

        <>
            <HeaderVendor />

            
            <Outlet />

            {/* <Footer /> */}


        </>


    );
}

export default VendorLayout;