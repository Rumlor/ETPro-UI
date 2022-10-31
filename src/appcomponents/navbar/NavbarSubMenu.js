import {NavLink} from "react-router-dom";
import {Dropdown} from "react-bootstrap";


export default function NavbarSubMenu(props){
    return (
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            <NavLink to={props.mainMenuUrl}>{props.mainMenuTitle}</NavLink>
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {
                props.subMenus != null ?(
                    props.subMenus.map(subMenu=>{
                        return (
                            <NavLink to={subMenu.url}>{subMenu.title}</NavLink>
                        );
                    })
                )
                :
                (<></>)
            }
        </Dropdown.Menu>
    </Dropdown>
    );


}