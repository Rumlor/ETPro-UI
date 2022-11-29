import {Link} from "react-router-dom";
import "./Navbar.css"
import {UilCloudLock} from "@iconscout/react-unicons";
import MenuDropDown from "./dropdown/MenuDropDown";
import "./Menulist"
import {Menulist} from "./Menulist";
import {useState} from "react";
import {loginServiceObject} from "../../services/LoginService";
import {ContactMail, Home, Person, Store} from "@material-ui/icons";
import Product from "../product/Product";
import {Inventory} from "@mui/icons-material";
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