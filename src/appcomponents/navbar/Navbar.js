import {Menulist} from "./Menulist";
import "./Navbar.css";
import {NavLink} from "react-router-dom";


export default function Navbar(){

    const menuList = Menulist.map(
         (item,index)=>{
        return (
            <li  key = {index} >
                <NavLink to={item.url}>{item.title}</NavLink>
            </li>
        );
    });

    return (
        <nav>
            <div className={"logo"}>
                ET<font>Pro</font>
            </div>
            <ul className={"menu-list"}>
                {menuList}
            </ul>
        </nav>
    );
}