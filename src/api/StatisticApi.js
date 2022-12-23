import {API, globalApiWrapper} from "./ApiList.js"
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

const {getStatistics} = globalApiWrapper.statisticApi


export const GET_STATISTICS = (onSuccessComponent,onFailComponent)=>{
    const reqOptions = prepareRequestOptions(getStatistics.httpMethod,getHttpHeaderWithToken(),null);
    fetch(getStatistics.url,reqOptions)
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

