
import {apiDelegateService} from "../api/ApiDelegateService";
import ComponentPromiseUtil from "../api/ComponentPromiseUtil"
 const loginService = (userName,password) => {
    const userLoginRequest = {
        userName:userName,
        userPassword:password
    };
    const promise = apiDelegateService.authenticationApi.postLogin(userLoginRequest)
    ComponentPromiseUtil.resolveResponse(promise,onSuccessLogin,onFailedLogin);
    return promise;
    
}

 const logoutService = ()=>{
    localStorage.removeItem("authenticatedUser")
}

const getAuthenticatedUserService = ()=>{
    return JSON.parse(localStorage.getItem("authenticatedUser"));
}

function onSuccessLogin(response) {
     console.log('successful login')
    localStorage.setItem("authenticatedUser",JSON.stringify(response.object));
}

function onFailedLogin(response) {
    console.log('failed login')
}



export const loginServiceObject = {
     loginService,
     logoutService,
    getAuthenticatedUserService
}