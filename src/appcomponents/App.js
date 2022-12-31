
import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css"
import Home from "./pages/Home"
import Product from "./product/Product";
import MarketPlace from "./marketplace/MarketPlace";
import MarketPlaceAdd from "./marketplace/MarketPlaceAdd";
import Login from "./security/Login";
import {loginServiceObject} from "../services/LoginService";
import {AuthenticatedRoute} from "./AuthenticatedRoute";
import {ComponentWithNav} from "./navbar/ComponentWithNav";
import NotFound from "./pages/NotFound";
import MarketPlaceTool from "./marketplace/MarketPlaceTool";
import MarketPlaceAddUpgraded from "./marketplace/MarketPlaceAddUpgraded";
function App() {
    const authenticatedUser = loginServiceObject.getAuthenticatedUserService();
    console.log('authenticated user')
    console.log(authenticatedUser);
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"}  element={<NotFound/>}></Route>
                <Route path={"/login"}  element={<Login/>}></Route>
                <Route path={"/"}  element={<AuthenticatedRoute component={<ComponentWithNav  component={<Home/>} />} />}></Route>
                <Route path={"/marketplaces/list"}  element= {<AuthenticatedRoute component = {<ComponentWithNav  component={<MarketPlace/>} />} />}></Route>
                <Route path={"/marketplaces/add"}  element= {<AuthenticatedRoute component = {<ComponentWithNav  component={<MarketPlaceAddUpgraded/>} />} />}></Route>
                <Route path={"/marketplaces/tool"}  element= {<AuthenticatedRoute component = {<ComponentWithNav  component={<MarketPlaceTool/>} />} />}></Route>
                <Route path={"/products"}  element= {<AuthenticatedRoute component = {<ComponentWithNav  component={<Product/>} />} />}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
