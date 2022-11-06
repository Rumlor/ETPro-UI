import {API} from "./ApiList.js"


   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{
       const reqOptions  = prepareRequestOptions(API[0].apis[0].httpMethod,{'Content-Type': 'application/json'},body)

         fetch(API[0].origin.concat(API[0].apis[0].url),reqOptions)
             .catch(() => onFail(true))
             .then((response)=> {
                 if (response.ok){
                    onSuccess(true)
                 } else {
                     onFail(true)
                 }
             })
             .then(response=>response.json())


    }

  function  prepareRequestOptions(httpMethod,httpHeaders,body){
        return {
            method:httpMethod,
            headers:httpHeaders,
            body:JSON.stringify(body)
        }
    }
