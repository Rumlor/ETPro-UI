export const createUrlWithPathParams= (path,...params)=>{
   return path+params[0]+"/"+params[1];
}
export const createUrlWithQueryParams = (keyValueQueryParam)=>{
    let queryParamBuilder = '?'
    keyValueQueryParam.forEach((value,key,map)=>queryParamBuilder += key+'='+value+'&')
   return queryParamBuilder.substring(0,queryParamBuilder.lastIndexOf('&'));
}