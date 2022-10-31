import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import MarketPlace from "./marketplace/MarketPlace";
import Home from "./pages/Home"
import Navbar from "./navbar/Navbar";





function App() {
    return (
        <div className={"container"}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path ={"/"} element={<Home/>} />
                    <Route path = {"/marketplaces"} element={<MarketPlace/>}/>
                    <Route path ={"/home"} element={<Home/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
