import {API, globalApiWrapper} from "./ApiList.js"
import {prepareRequestOptions,getHttpHeaderWithToken} from "../services/HttpHeaderAndMiscService";
import { createUrlWithPathParams, createUrlWithQueryParams } from "./ApiUtils.js";
import { loginServiceObject } from "../services/LoginService.js";

const {getParameters,addParameter,deleteParameter,updateParameter} = {...globalApiWrapper.jobApi}


export const POST_PARAMETER = (body,onSuccessComponent,onFailComponent)=>{
    const reqOptions = prepareRequestOptions(addParameter.httpMethod,getHttpHeaderWithToken(),body)
    fetch(addParameter.url,reqOptions)
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
    const reqOptions = prepareRequestOptions(getParameters.httpMethod,getHttpHeaderWithToken(),null)
    fetch(getParameters.url,reqOptions)
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
    const reqOptions = prepareRequestOptions(deleteParameter.httpMethod,getHttpHeaderWithToken(),null);
    fetch(deleteParameter.url.concat(createUrlWithPathParams(marketPlaceType,productCode)),reqOptions)
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
    const reqOptions =  prepareRequestOptions(updateParameter.httpMethod,getHttpHeaderWithToken(),null)
    fetch(updateParameter.url.concat(createUrlWithQueryParams(queryMap)),reqOptions)

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