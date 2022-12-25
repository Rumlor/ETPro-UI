export const createUrlWithPathParams= (params)=>{
   return "/" + params.join("/")
}
export const createUrlWithQueryParams = (keyValueQueryParam)=>{
    let queryParamBuilder = '?'
    keyValueQueryParam.forEach((value,key,map)=>queryParamBuilder += key+'='+value+'&')
   return queryParamBuilder.substring(0,queryParamBuilder.lastIndexOf('&'));
}