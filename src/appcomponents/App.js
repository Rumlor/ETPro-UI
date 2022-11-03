
import React from "react";
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css"

import Home from "./pages/Home"
import Product from "./product/Product";
import MarketPlace from "./marketplace/MarketPlace";
import MarketPlaceAdd from "./marketplace/MarketPlaceAdd";
function App() {

    return (
        <BrowserRouter>
                <Navbar/>
            <Routes>
                <Route path={"/"}  element={<Home/>}></Route>
                <Route path={"/marketplaces/list"}  element={<MarketPlace/>}></Route>
                <Route path={"/marketplaces/add"} element={<MarketPlaceAdd/>}></Route>
                <Route path={"/products"} element={<Product/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
