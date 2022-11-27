import {API} from "./ApiList.js"

import getAuthenticatedUserHeaderFromLocalStorage from "../services/HeaderService";
   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{
       const reqOptions  = prepareRequestOptions(API[0].apis[0].httpMethod,getHttpHeadersWithToken(),body)

         fetch(API[0].origin.concat(API[0].apis[0].url),reqOptions)
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
   export const GET_MARKETPLACES = (body,OnSuccess,OnFail) => {
        const reqOptions  = prepareRequestOptions(API[0].apis[1].httpMethod,getAuthenticatedUserHeaderFromLocalStorage(),body)
        fetch(API[0].origin.concat(API[0].apis[1].url),reqOptions)
            .then(response=>response.json())
            .then((response)=> {
                if (response.result){
                    OnSuccess(response)
                } else {
                    OnFail(response)
                }
            })
            .catch(reason => OnFail(reason))

    }
   export const DELETE_MARKETPLACE = (pathVariable,onSuccess,onFail)=>{
       const base =  API[0].origin;
       const url =API[0].apis[2].url.concat(pathVariable)
       const method = API[0].apis[2].httpMethod;
       const reqOptions =  prepareRequestOptions(method,getHttpHeadersWithToken(),null);
       fetch(base.concat(url),reqOptions)
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
   export const PUT_MARKETPLACE = (body,onSuccess,onFail)=>{
       console.log('token for put')
       console.log(getAuthenticatedUserHeaderFromLocalStorage())
       const base =  API[0].origin;
       const url =API[0].apis[3].url
       const method = API[0].apis[3].httpMethod;
       const reqOptions =  prepareRequestOptions(method,getHttpHeadersWithToken(),body);
       fetch(base.concat(url),reqOptions)
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

   function getHttpHeadersWithToken() {
    return {...getAuthenticatedUserHeaderFromLocalStorage(), ...{'Content-Type': 'application/json'}};
}
   function  prepareRequestOptions(httpMethod,httpHeaders,body){
       console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
         return   {
                      method:httpMethod !== null ? httpMethod : null,
                      headers:httpHeaders !== null ? httpHeaders: null,
                      body: body!== null ? JSON.stringify(body) : null
                }

    }
