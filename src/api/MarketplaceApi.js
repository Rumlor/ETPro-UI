import {API,globalApiWrapper} from "./ApiList.js"

import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{

       const reqOptions  = prepareRequestOptions(
                    globalApiWrapper.marketPlaceApi.addMarketPlace.httpMethod,
                    getHttpHeaderWithToken(),
                    body)

         fetch(globalApiWrapper.marketPlaceApi.addMarketPlace.url,reqOptions)
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
   export const GET_MARKETPLACES = (body,OnSuccess,OnFail) => {

        const reqOptions  = prepareRequestOptions(
            globalApiWrapper.marketPlaceApi.getMarketPlaceList.httpMethod,
            getHttpHeaderWithToken(),
            body)
        console.log('header for marketplace get')
        console.log(reqOptions)    
        fetch(globalApiWrapper.marketPlaceApi.getMarketPlaceList.url,reqOptions)
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
       const deleteMarketPlace = globalApiWrapper.marketPlaceApi.deleteMarketPlace; 
       const reqOptions =  prepareRequestOptions(
                                deleteMarketPlace.httpMethod,
                                getHttpHeaderWithToken(),null);
       fetch(deleteMarketPlace.url.concat("/").concat(pathVariable),reqOptions)
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
       const updateMarketPlace = globalApiWrapper.marketPlaceApi.updateMarketPlace; 
       const reqOptions =  prepareRequestOptions(
                        updateMarketPlace.httpMethod,
                        getHttpHeaderWithToken(),body);
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


