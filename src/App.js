import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/router";
import "@fortawesome/fontawesome-free/css/all.css";

//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Layout from './components/Layout';
//import ProductDetails from './components/ProductDetails';
//import ProductList from './components/ProductList';
//import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

//<Router>
//<Routes>
//
//    <Route path="productDetails/:id" element={<ProductDetails />} />
//    <Route path="ProductList" element={<ProductList />} />
//  </Route>
//  <Route path="*" element={<NotFound />} />
//</Routes>
//</Router>
