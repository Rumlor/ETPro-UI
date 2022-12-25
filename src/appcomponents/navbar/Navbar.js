import {Link} from "react-router-dom";
import "./Navbar.css"
import {UilCloudLock} from "@iconscout/react-unicons";
import "./Menulist"
import {Menulist} from "./Menulist";
import {useState} from "react";
import AppDrawer from "./drawer/AppDrawer";

export default function Navbar(){
    const [dropdown,setDropdown] = useState(false);
    return (
        <>
            {
                    <nav className={"navbar"}>
                        <Link to={"/"} className={"navbar-logo"}>
                            ET<font className={"navbar-logo-font"}>PRO</font>
                            <UilCloudLock size={30}/>
                        </Link>
                        <ul className={"menu-items"}>

                            {

                                Menulist.map((item,index)=>
                                    <AppDrawer item = {item} />
                                )
                            }
                        </ul>
                    </nav>
            }
        </>
    );
}