import {Navigate} from "react-router-dom";
import {loginServiceObject} from "../services/LoginService";

export  const AuthenticatedRoute = ({component}) =>{

    return (
        <>
            {
                loginServiceObject.getAuthenticatedUserService() ? component : <Navigate to={{pathname:'/login'}} />
            }
        </>
    )
}