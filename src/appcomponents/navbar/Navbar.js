import {Link} from "react-router-dom";
import "./Navbar.css"
import {UilCloudLock} from "@iconscout/react-unicons";
import MenuDropDown from "./dropdown/MenuDropDown";
import "./Menulist"
import {Menulist} from "./Menulist";
import {useState} from "react";

export default function Navbar(){
    const [dropdown,setDropdown] = useState(false);
    return (
        <>
           <nav className={"navbar"}>
                <Link to={"/"} className={"navbar-logo"}>
                    ET<font className={"navbar-logo-font"}>PRO</font>
                    <UilCloudLock size={30}/>
                </Link>
               <ul className={"menu-items"}>
                   {
                       Menulist.map((item,index)=>{
                           if (item.title === 'Pazar Yerleri')
                           {
                               return (
                                   <li key={index} className={"menu-item"} onMouseEnter={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
                                       <Link to={item.url} >{item.title}</Link>
                                       {dropdown && <MenuDropDown subMenus={item.subMenus}/>}
                                   </li>
                               )
                           }
                           return (<li key={index} className={"menu-item"}>
                                   <Link to={item.url}>{item.title}</Link>
                               </li>)
                       })
                   }
               </ul>
           </nav>

        </>
    );
}