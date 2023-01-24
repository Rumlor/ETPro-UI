import {globalApiWrapper} from "./ApiList";
import {
    getHttpHeaderWithToken,
    prepareRequestOptions,
    prepareRequestOptionsFormData
} from "../services/HttpHeaderAndMiscService";
import {createUrlWithPathParams} from "./ApiUtils";

const {calculateProduct,exportProduct,importProduct,getProductList,deleteProduct,updateProduct} = {...globalApiWrapper.productApi}

export  const POST_PRODUCT_CALCULATOR = (body)=>{
    const reqOptions  = prepareRequestOptions(calculateProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(calculateProduct.url,reqOptions)
                .then(response=>response.json())
}
export  const PATCH_PRODUCT_UPDATE = (body)=>{
    const reqOptions  = prepareRequestOptions(updateProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(updateProduct.url,reqOptions)
        .then(response=>response.json())
}
export const POST_PRODUCT_EXPORT_EXCEL = (body) =>{
    const reqOptions  = prepareRequestOptions(exportProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(exportProduct.url,reqOptions)
                .then(response=>response.blob())
}
export const GET_PRODUCT_LIST = (_) =>{
    const reqOptions  = prepareRequestOptions(getProductList.httpMethod,getHttpHeaderWithToken(),null)
    return fetch(getProductList.url,reqOptions)
        .then(response=>response.json())
}

export const DELETE_PRODUCT = (paramArray) =>{
    const reqOptions = prepareRequestOptions(deleteProduct.httpMethod,getHttpHeaderWithToken(),null);
    return fetch(deleteProduct.url.concat(createUrlWithPathParams(paramArray)),reqOptions)
        .then(response=>response.json())
}

export const POST_PRODUCT_IMPORT_EXCEL =(body)=>{
    const reqOptions  = prepareRequestOptionsFormData(importProduct.httpMethod,getHttpHeaderWithToken(),body)
    return fetch(importProduct.url,reqOptions)
        .then(response=>response.json())
}
