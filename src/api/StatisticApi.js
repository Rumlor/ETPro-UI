import { globalApiWrapper} from "./ApiList.js"
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

const {getDashboardStatistics} = globalApiWrapper.statisticApi


export const GET_STATISTICS = (onSuccessComponent,onFailComponent)=>{
    const reqOptions = prepareRequestOptions(getDashboardStatistics.httpMethod,getHttpHeaderWithToken(),null);
    fetch(getDashboardStatistics.url,reqOptions)
    .then(response=>response.json())
    .then((response)=> {
        if (response.result){
            onSuccessComponent(response)
        } else {
            onFailComponent(response)
        }
    })
    .catch(reason => onFailComponent(reason))
}

