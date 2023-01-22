import {loginServiceObject} from "./LoginService";

export default function getAuthenticatedUserHeaderFromLocalStorage(){
    const user = loginServiceObject.getAuthenticatedUserService();
    console.log('user in storage')
    console.log(user)
    return user != null  ? {"Authorization":"Bearer "+ user.token} : {};
}
export const  prepareRequestOptions= (httpMethod,httpHeaders,body) =>
{
    console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
      return   {
                   method:httpMethod !== null ? httpMethod : null,
                   headers:httpHeaders !== null ? httpHeaders: null,
                   body: body!== null ? JSON.stringify(body) : null
             }

}
export const prepareRequestOptionsFormData =(httpMethod,httpHeaders,formData) =>{
    delete httpHeaders['Content-Type']
    return   {
        method:httpMethod !== null ? httpMethod : null,
        headers: httpHeaders,
        body: formData
    }
}
export const getHttpHeaderWithToken = _ => {
    return {...getAuthenticatedUserHeaderFromLocalStorage(),...favoriteHeaderValues};
}
const favoriteHeaderValues = {
    'Content-Type':'application/json'
}