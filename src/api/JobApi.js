import {API} from "./ApiList.js"
import getAuthenticatedUserHeaderFromLocalStorage from "../services/HeaderService";
import { createUrlWithPathParams, createUrlWithQueryParams } from "./ApiUtils.js";
import { loginServiceObject } from "../services/LoginService.js";

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
export const GET_PARAMETERS = (onSuccessComponent,onFailComponent)=>{
    const method = API[3].apis[1].httpMethod;
    const reqOptions =  prepareRequestOptions(method,{...getAuthenticatedUserHeaderFromLocalStorage(),...{'Content-Type':'application/json'}},null);
    fetch(API[3].origin.concat(API[3].apis[1].url),reqOptions)
    .then(response=>response.json())
    .then((response)=> {
        if (response.result){
            onSuccessComponent(response)
        } else {
            loginServiceObject.navigateToLogin(response)
            onFailComponent(response)
        }
    })
    .catch(reason => onFailComponent(reason))
}
export const DELETE_PARAMETER = (productCode,marketPlaceType,onSuccessComponent,onFailComponent) =>{
    const method = API[3].apis[2].httpMethod;
    const urlWithoutPathParameters = API[3].apis[2].url
    const urlWithPathParameters = createUrlWithPathParams(urlWithoutPathParameters,marketPlaceType,productCode);
    console.log('url with parameters :'+urlWithPathParameters);
    const reqOptions = prepareRequestOptions(method,{...getAuthenticatedUserHeaderFromLocalStorage(),...{'Content-Type':'application/json'}},null);
    fetch(API[3].origin.concat(urlWithPathParameters),reqOptions)
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
export const UPDATE_TRACKING_PARAMETER = (queryMap,onSuccessComponent,onFailComponent)=>{
    const method = API[3].apis[3].httpMethod;
    const urlWithoutPathParameters =  API[3].apis[3].url
    const queryParamString =  createUrlWithQueryParams(queryMap)
    const urlWithPathParameters = urlWithoutPathParameters.concat(queryParamString);
    const finalUrl = API[3].origin.concat(urlWithPathParameters)
    console.log(finalUrl)
    const reqOptions =  prepareRequestOptions(method,{...getAuthenticatedUserHeaderFromLocalStorage(),...{'Content-Type':'application/json'}},null);
    fetch(finalUrl,reqOptions)

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