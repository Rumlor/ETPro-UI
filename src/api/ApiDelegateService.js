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
    
 import {POST_LOGIN as postLoginApi} from "./AuthApi"   

 import { POST_PRODUCT_CALCULATOR as postProductCalculatorApi ,
          POST_PRODUCT_IMPORT_EXCEL as postProductImportExcelApi ,
          POST_PRODUCT_EXPORT_EXCEL as postProductExportExcelApi } from "./ProductApi"

const getStatistics = _ => withoutBody(getStatisticsApi);

const postParameter = (body) => withBody(body,postParameterApi);
const updateParameter = (queryMap)=>withQueryParam(queryMap,updateParameterApi)
const deleteParameter = (params) => withPathParam(params,deleteParameterApi);
const getParameters = _ => withoutBody(getParametersApi);


const postMarketPlace = (body) =>withBody(body,postMarketPlaceApi);
const updateMarketPlace = (body)=>withBody(body,updateMarketPlaceApi);
const deleteMarketPlace = (params) =>withPathParam(params,deleteMarketPlaceApi);
const getMarketPlaces = _ =>withoutBody(getMarketPlacesApi)

const postLogin = (body)=>withBody(body,postLoginApi)

const postProductCalculator = (body)=>withBody(body,postProductCalculatorApi)
const postProductExportExcel = (body)=>withBody(body,postProductExportExcelApi)

function withBody (body,api) { 
    return api(body);
}
function withQueryParam(queryMap,api) {
    return api(queryMap);
}
function withPathParam(params,api) {
    return api(params);
}
function withoutBody (api) {
    return api ();
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
    } ,
    authenticationApi : {
        postLogin
    },
    productApi : {
        postProductCalculator,
        postProductExportExcel,
        postProductImportExcelApi
    }
}