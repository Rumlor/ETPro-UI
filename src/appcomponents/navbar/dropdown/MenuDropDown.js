import "./MenuDropDown.css"
import {Link} from "react-router-dom";
import {Menulist} from "../Menulist";
import {useState} from "react";
function MenuDropDown(props){

    const [dropdown,setDropdown] = useState(false);

    return (
        <>
            <ul className={dropdown?"marketplace-dropdown-menu-clicked":"marketplace-dropdown-menu"} onClick={()=>setDropdown(!dropdown)}>
                {
                    props.subMenus.map((menu,index)=>
                        {
                            return (
                                <li key={index}>
                                    <Link className={"marketplace-dropdown-menu-item"} to={menu.url} onClick={()=>setDropdown(!dropdown)}>{menu.title}</Link>
                                </li>
                            )
                        }

                    )
                }
            </ul>
        </>
    );
}
export default MenuDropDown;