import {API} from "./ApiList";
import getAuthenticatedUserHeaderFromLocalStorage from "../services/HeaderService";

export  const POST_PRODUCT_CALCULATOR = (body,onSuccess,onFail)=>{
    const reqOptions  = prepareRequestOptions(API[1].apis[0].httpMethod,getHttpHeadersWithToken(),body)

    fetch(API[1].origin.concat(API[1].apis[0].url),reqOptions)
        .then(response=>response.json())
        .then((response)=> {
            if (response.result){
                onSuccess(response)
            } else {
                onFail(response)
            }
        })
        .catch(reason => onFail(reason))



}
export const POST_PRODUCT_EXPORT_EXCEL = (body,onSuccess,onFail) =>{
    const reqOptions  = prepareRequestOptions(API[1].apis[1].httpMethod,getHttpHeadersWithToken(),body)

    fetch(API[1].origin.concat(API[1].apis[1].url),reqOptions)
        .then(response=>response.blob())
        .then((response)=> {
            console.log('response!!')
            onSuccess(response);
        })
        .catch(reason => onFail(reason))


}
function  prepareRequestOptions(httpMethod,httpHeaders,body){
    console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
    return   {
        method:httpMethod !== null ? httpMethod : null,
        headers:httpHeaders !== null ? httpHeaders: null,
        body: body!== null ? JSON.stringify(body) : null
    }

}
function getHttpHeadersWithToken() {
    return {...getAuthenticatedUserHeaderFromLocalStorage(), ...{'Content-Type': 'application/json'}};
}