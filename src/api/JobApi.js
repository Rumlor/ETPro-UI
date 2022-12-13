import {API} from "./ApiList.js"
import getAuthenticatedUserHeaderFromLocalStorage from "../services/HeaderService";
export const POST_PARAMETER = (body,onSuccessComponent,onFailComponent)=>{
    const method = API[3].apis[0].httpMethod;
    const reqOptions =  prepareRequestOptions(method,{...getAuthenticatedUserHeaderFromLocalStorage(),...{'Content-Type':'application/json'}},body);
    fetch(API[3].origin.concat(API[3].apis[0].url),reqOptions)

        .then(response=>response.json())
        .then((response)=> {
            if (response.result){
                onSuccessComponent(response)
            } else {
                onFailComponent(response)
            }
        })
        .catch(reason => onFailComponent(reason))
}

function  prepareRequestOptions(httpMethod,httpHeaders,body){
    console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
    return   {
        method:httpMethod !== null ? httpMethod : null,
        headers:httpHeaders !== null ? httpHeaders: null,
        body: body!== null ? JSON.stringify(body) : null
    }

}