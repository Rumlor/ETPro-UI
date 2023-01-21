import {API, globalApiWrapper} from "./ApiList";
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

const {calculateProduct,exportProduct} = {...globalApiWrapper.productApi}

export  const POST_PRODUCT_CALCULATOR = (body)=>{
    const reqOptions  = prepareRequestOptions(calculateProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(calculateProduct.url,reqOptions)
                .then(response=>response.json())
}
export const POST_PRODUCT_EXPORT_EXCEL = (body) =>{
    const reqOptions  = prepareRequestOptions(exportProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(exportProduct.url,reqOptions)
                .then(response=>response.blob())


}
