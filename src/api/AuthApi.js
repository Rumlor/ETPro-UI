import { prepareRequestOptions ,getHttpHeaderWithToken} from "../services/HttpHeaderAndMiscService";
import {API, globalApiWrapper} from "./ApiList";

export const POST_LOGIN = (body,onSuccess,onFail,onSuccessComponent,onFailComponent)=>{
    const login = globalApiWrapper.authenticationApi.login; 
    const reqOptions =  prepareRequestOptions(login.httpMethod,getHttpHeaderWithToken(),body)
    fetch(login.url,reqOptions)
        .then(response=>response.json())
        .then((response)=> {
            if (response.result){
                onSuccess(response,onSuccessComponent)
            } else {
                onFail(response,onFailComponent)
            }
        })
        .catch(reason => onFail(reason,onFailComponent))
}
