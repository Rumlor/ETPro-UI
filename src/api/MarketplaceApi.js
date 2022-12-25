import {API,globalApiWrapper} from "./ApiList.js"
import { createUrlWithPathParams } from "./ApiUtils.js";
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

   const {addMarketPlace,getMarketPlaceList,deleteMarketPlace,updateMarketPlace} = {...globalApiWrapper.marketPlaceApi};

   export  const POST_MARKETPLACE = (body)=>{
       const reqOptions  = prepareRequestOptions(addMarketPlace.httpMethod,getHttpHeaderWithToken(),body)
        return fetch(addMarketPlace.url,reqOptions)
                .then(response=>response.json())
    }
   export const GET_MARKETPLACES = (_) => {
        const reqOptions  = prepareRequestOptions(getMarketPlaceList.httpMethod,getHttpHeaderWithToken(),null)
        return fetch(getMarketPlaceList.url,reqOptions)
                .then(response=>response.json())
    }
   export const DELETE_MARKETPLACE = (pathVariables)=>{
       const reqOptions =  prepareRequestOptions(deleteMarketPlace.httpMethod,getHttpHeaderWithToken(),null);
       return fetch(deleteMarketPlace.url.concat(createUrlWithPathParams(pathVariables)),reqOptions)
                .then(response=>response.json())
   }
   export const PUT_MARKETPLACE = (body)=>{
       const reqOptions =  prepareRequestOptions(updateMarketPlace.httpMethod,getHttpHeaderWithToken(),body);
       return fetch(updateMarketPlace.url,reqOptions)
                .then(response=>response.json())
   }


