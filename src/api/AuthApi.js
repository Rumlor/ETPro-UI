import {API} from "./ApiList";

export const POST_LOGIN = (body,onSuccess,onFail,onSuccessComponent,onFailComponent)=>{
    const method = API[2].apis[1].httpMethod;
    const reqOptions =  prepareRequestOptions(method,{'Content-Type': 'application/json'},body);
    fetch(API[2].origin.concat(API[2].apis[1].url),reqOptions)

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


function  prepareRequestOptions(httpMethod,httpHeaders,body){
    console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
    return   {
        method:httpMethod !== null ? httpMethod : null,
        headers:httpHeaders !== null ? httpHeaders: null,
        body: body!== null ? JSON.stringify(body) : null
    }

}