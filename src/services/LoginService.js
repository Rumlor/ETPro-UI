import {POST_LOGIN} from "../api/AuthApi";

 const loginService = (userName,password,onSuccessComponent,onFailComponent) => {
    const userLoginRequest = {
        userName:userName,
        userPassword:password
    };
    POST_LOGIN(userLoginRequest,onSuccessLogin,onFailedLogin,onSuccessComponent,onFailComponent)
}

 const logoutService = ()=>{
    localStorage.removeItem("authenticatedUser")
}

const getAuthenticatedUserService = ()=>{
    return JSON.parse(localStorage.getItem("authenticatedUser"));
}

function onSuccessLogin(response,compSuccess) {
     console.log('successful login')
    localStorage.setItem("authenticatedUser",JSON.stringify(response.object));
    compSuccess(response)
}

function onFailedLogin(response,compFail) {
    console.log('failed login')
    console.log(response)
    compFail(response)
}

export const loginServiceObject = {
     loginService,
     logoutService,
    getAuthenticatedUserService
}