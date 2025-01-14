import React from 'react';
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./components/Home.jsx";
import {Routes,Route} from "react-router-dom";
import  {HelmetProvider} from "react-helmet-async";
import {ToastContainer} from "react-toastify";
import ProductDetail from "./components/Product/ProductDetail.jsx";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen"  >
          <HelmetProvider>
              <Header />
                <ToastContainer
                theme={"dark"}
                />
              <div className="flex-1 flex">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      {/*<Route path="/about" element={<About />} />*/}
                      {/*<Route path="/contact" element={<Contact />} />*/}
                      {/*<Route path="/products" element={<Products />} />*/}
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </div>
              <Footer />
          </HelmetProvider>
        </div>
    );
};

export default App;