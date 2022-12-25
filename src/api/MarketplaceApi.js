import {API,globalApiWrapper} from "./ApiList.js"
import { createUrlWithPathParams } from "./ApiUtils.js";
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

   const {addMarketPlace,getMarketPlaceList,deleteMarketPlace,updateMarketPlace} = {...globalApiWrapper.marketPlaceApi};

   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{
       const reqOptions  = prepareRequestOptions(addMarketPlace.httpMethod,getHttpHeaderWithToken(),body)
         fetch(addMarketPlace.url,reqOptions)
             .then(response=>response.json())
             .then((response)=> {
                 if (response.result){
                    onSuccess(response)
                 } 
                  else {
                     onFail(response)
                 }
             })
             .catch(reason => onFail(reason))
    }
   export const GET_MARKETPLACES = (OnSuccess,OnFail) => {
        const reqOptions  = prepareRequestOptions(getMarketPlaceList.httpMethod,getHttpHeaderWithToken(),null)
        fetch(getMarketPlaceList.url,reqOptions)
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
   export const DELETE_MARKETPLACE = (pathVariables,onSuccess,onFail)=>{
       const reqOptions =  prepareRequestOptions(deleteMarketPlace.httpMethod,getHttpHeaderWithToken(),null);
       fetch(deleteMarketPlace.url.concat(createUrlWithPathParams(pathVariables)),reqOptions)
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
       const reqOptions =  prepareRequestOptions(updateMarketPlace.httpMethod,getHttpHeaderWithToken(),body);
       fetch(updateMarketPlace.url,reqOptions)
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


