import {Navigate, Route} from "react-router-dom";
import {loginServiceObject} from "../services/LoginService";

export  const AuthenticatedRoute = ({component:Component}) =>{

    return (
        <>
            {
                loginServiceObject.getAuthenticatedUserService() ? Component : <Navigate to={{pathname:'/login'}} />
            }
        </>
    )
}