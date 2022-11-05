import {API} from "./ApiList.js"


   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{
       const reqOptions  = prepareRequestOptions(API[0].apis[0].httpMethod,{'Content-Type': 'application/json'},body)

         fetch(API[0].origin.concat(API[0].apis[0].url),reqOptions)
             .then(response=>response.json())
             .then(data=>console.log(data))
             .catch(reason => onFail(reason))


    }

  function  prepareRequestOptions(httpMethod,httpHeaders,body){
        return {
            method:httpMethod,
            headers:httpHeaders,
            body:JSON.stringify(body)
        }
    }
