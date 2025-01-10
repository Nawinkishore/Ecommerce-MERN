import React from 'react';
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import NotFound from "./components/NotFound.jsx";
import {Routes,Route} from "react-router-dom";
const App = () => {
    return (
        <div className="flex flex-col min-h-screen"  >
            <Header />
                <div className="flex-1">
                    <Routes>
                        {/* <Route path="/" element={<Home />} />*/}
                        {/*<Route path="/about" element={<About />} />*/}
                        {/*<Route path="/contact" element={<Contact />} />*/}
                        {/*<Route path="/products" element={<Products />} />*/}
                        {/*<Route path="/products/:id" element={<Product />} />*/}
                        {/*<Route path="*" element={<NotFound />} />*/}
                    </Routes>
                </div>
            <Footer />
        </div>
    );
};

export default App;