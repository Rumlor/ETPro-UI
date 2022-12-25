import { GET_STATISTICS as getStatisticsApi } from "./StatisticApi"
import {
    UPDATE_TRACKING_PARAMETER as updateParameterApi, 
    POST_PARAMETER as postParameterApi,
    GET_PARAMETERS as getParametersApi,
    DELETE_PARAMETER as deleteParameterApi} from "./JobApi"

import {
    POST_MARKETPLACE as postMarketPlaceApi,
        GET_MARKETPLACES as getMarketPlacesApi,
        DELETE_MARKETPLACE as deleteMarketPlaceApi,
        PUT_MARKETPLACE as updateMarketPlaceApi
    } from "./MarketplaceApi"    

const getStatistics = (callBack) => withoutBody(callBack.success,callBack.fail,getStatisticsApi);

const postParameter = (body,callBack) => withBody(body,callBack.success,callBack.fail,postParameterApi);
const updateParameter = (queryMap,callBack)=>withQueryParam(queryMap,callBack.success,callBack.fail,updateParameterApi)
const deleteParameter = (params,callBack) => withPathParam(params,callBack.success,callBack.fail,deleteParameterApi);
const getParameters = (callBack)=> withoutBody(callBack.success,callBack.fail,getParametersApi);


const postMarketPlace = (body,callBack) =>withBody(body,callBack.success,callBack.fail,postMarketPlaceApi);
const updateMarketPlace = (body,callBack)=>withBody(body,callBack.success,callBack.fail,updateMarketPlaceApi);
const deleteMarketPlace = (params,callBack) =>withPathParam(params,callBack.success,callBack.fail,deleteMarketPlaceApi);
const getMarketPlaces = (callBack)=>withoutBody(callBack.success,callBack.fail,getMarketPlacesApi)

function withBody (body,onSuccessParam,onFailParam,api) { 
    api(body,onSuccessParam,onFailParam,);
}
function withQueryParam(queryMap,onSuccessParam,onFailParam,api) {
    api(queryMap,onSuccessParam,onFailParam);
}
function withPathParam(params,onSuccessParam,onFailParam,api) {
    api(params,onSuccessParam,onFailParam);
}
function withoutBody (onSuccessParam,onFailParam,api) {
    api (onSuccessParam,onFailParam);
}


export const  apiDelegateService = {
    statisticsApi :{
        getStatistics
    },
    parameterApi: {
        postParameter,
        updateParameter,
        getParameters,
        deleteParameter
    } ,
    marketPlaceApi:{
        postMarketPlace,
        updateMarketPlace,
        deleteMarketPlace,
        getMarketPlaces
    }
}