import {API} from "./ApiList.js"


   export  const POST_MARKETPLACE = (body,onSuccess,onFail)=>{
       const reqOptions  = prepareRequestOptions(API[0].apis[0].httpMethod,{'Content-Type': 'application/json'},body)

         fetch(API[0].origin.concat(API[0].apis[0].url),reqOptions)
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
    export const GET_MARKETPLACES = (body,OnSuccess,OnFail) => {
        console.log('here')
        const reqOptions  = prepareRequestOptions(API[0].apis[1].httpMethod,{'Content-Type': 'application/json'},body)
        fetch(API[0].origin.concat(API[0].apis[1].url),reqOptions)
            .then(response=>response.json())
            .then((response)=> {
                if (response.result){
                    OnSuccess(response)
                } else {
                    OnFail(response)
                }
            })
            .catch(reason => OnFail(reason))

    }


  function  prepareRequestOptions(httpMethod,httpHeaders,body){
       console.log(`method ${httpMethod},headers:${httpHeaders} ,body:${body}`)
         return   {
                      method:httpMethod !== null ? httpMethod : null,
                      headers:httpHeaders !== null ? httpHeaders: null,
                      body: body!== null ? JSON.stringify(body) : null
                }

    }
