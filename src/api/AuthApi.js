import { prepareRequestOptions ,getHttpHeaderWithToken} from "../services/HttpHeaderAndMiscService";
import {API, globalApiWrapper} from "./ApiList";


const {login,register} = globalApiWrapper.authenticationApi


export const POST_LOGIN = (body)=>{
    const reqOptions =  prepareRequestOptions(login.httpMethod,getHttpHeaderWithToken(),body)
    return  fetch(login.url,reqOptions)
            .then(response=>response.json())
}
