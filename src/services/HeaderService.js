import {loginServiceObject} from "./LoginService";

export default function getAuthenticatedUserHeaderFromLocalStorage(){
    const user = loginServiceObject.getAuthenticatedUserService();
    console.log('user in storage')
    console.log(user)
    return user != null  ? {"Authorization":"Bearer "+ user.token} : {};
}