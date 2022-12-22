import {API, globalApiWrapper} from "./ApiList";
import {getHttpHeaderWithToken,prepareRequestOptions} from "../services/HttpHeaderAndMiscService";

const {calculateProduct,exportProduct} = {...globalApiWrapper.productApi}

export  const POST_PRODUCT_CALCULATOR = (body,onSuccess,onFail)=>{
    const reqOptions  = prepareRequestOptions(calculateProduct.httpMethod,getHttpHeaderWithToken(),body)
    fetch(calculateProduct.url,reqOptions)
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
export const POST_PRODUCT_EXPORT_EXCEL = (body,onSuccess,onFail) =>{
    const reqOptions  = prepareRequestOptions(exportProduct.httpMethod,getHttpHeaderWithToken(),body)
    fetch(exportProduct.url,reqOptions)
        .then(response=>response.blob())
        .then((response)=> {
            onSuccess(response);
        })
        .catch(reason => onFail(reason))


}
