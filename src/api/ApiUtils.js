export const createUrlWithPathParams= (path,...params)=>{
   return path+params[0]+"/"+params[1];
}