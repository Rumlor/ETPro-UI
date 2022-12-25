import {API, globalApiWrapper} from "./ApiList.js"
import {prepareRequestOptions,getHttpHeaderWithToken} from "../services/HttpHeaderAndMiscService";
import { createUrlWithPathParams, createUrlWithQueryParams } from "./ApiUtils.js";
import { loginServiceObject } from "../services/LoginService.js";

const {getParameters,addParameter,deleteParameter,updateParameter} = {...globalApiWrapper.jobApi}


export const POST_PARAMETER = (body)=>{
    const reqOptions = prepareRequestOptions(addParameter.httpMethod,getHttpHeaderWithToken(),body)
    return  fetch(addParameter.url,reqOptions)
            .then(response=>response.json())
}
export const GET_PARAMETERS = ()=>{
    const reqOptions = prepareRequestOptions(getParameters.httpMethod,getHttpHeaderWithToken(),null)
    return fetch(getParameters.url,reqOptions)
           .then(response=>response.json())
    
}
export const DELETE_PARAMETER = (paramArray) =>{
    const reqOptions = prepareRequestOptions(deleteParameter.httpMethod,getHttpHeaderWithToken(),null);
    return fetch(deleteParameter.url.concat(createUrlWithPathParams(paramArray)),reqOptions)
           .then(response=>response.json())
}
export const UPDATE_TRACKING_PARAMETER = (queryMap)=>{
    const reqOptions =  prepareRequestOptions(updateParameter.httpMethod,getHttpHeaderWithToken(),null)
    return fetch(updateParameter.url.concat(createUrlWithQueryParams(queryMap)),reqOptions)
           .then(response=>response.json())

}