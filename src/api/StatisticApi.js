import { globalApiWrapper} from "./ApiList.js"
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

const {getDashboardStatistics} = globalApiWrapper.statisticApi


export const GET_STATISTICS = _=>{
    const reqOptions = prepareRequestOptions(getDashboardStatistics.httpMethod,getHttpHeaderWithToken(),null);
    return fetch(getDashboardStatistics.url,reqOptions)
            .then(response=>response.json());
}

