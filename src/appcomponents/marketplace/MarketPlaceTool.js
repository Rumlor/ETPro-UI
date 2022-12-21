import { useEffect, useState } from "react"
import { DELETE_PARAMETER, GET_PARAMETERS, POST_PARAMETER } from "../../api/JobApi"
import AppAlert from "../AppAlert"
import "./MarketPlaceTool.css"
import '../pages/css/tailwind.css'
import '../pages/css/tailwind.output.css'
export default function MarketPlaceTool(){

    const initialState = {
        merchantId:null,
        productCode:'',
        productUrl:'',
        productName:'',
        toleranceAmount:'',
        productAmountLowerBound:'',
        productAmountUpperBound:'',
        marketPlaceType:'TRENDYOL'
    }
    const [updateFlag,setUpdateFlag] = useState(true);
    const [fetchedMerchantProductParameters,setFetchedMerchantProductParameters] = useState(null);
    const [merchantProductParameter,setMerchantProductParameter] = useState(initialState)
    const [toolAlert,setToolAlert] = useState({show:false,message:null,error:true})
    useEffect(()=>{
        if(updateFlag){
            GET_PARAMETERS(onSuccessFetch,onFailFetch);
            setUpdateFlag(false);
        }
    },[updateFlag]);
    const onChange = (target,value) =>{
        setMerchantProductParameter({...merchantProductParameter,[target]:value})
    }
    function validated(){
        return  parseFloat(merchantProductParameter.productAmountLowerBound) > 0 &&
                parseFloat(merchantProductParameter.productAmountUpperBound) > 0 &&
                merchantProductParameter.productCode.length > 0 &&
                merchantProductParameter.productUrl.length > 0 &&
                parseFloat(merchantProductParameter.toleranceAmount) > 0
    }
    function onSuccessPost(res){
        console.log(res);
        setUpdateFlag(true);
        setToolAlert({show:true,message: 'Başarıyla Kaydedildi.',error:false})   
    }
    function onSuccessFetch(res){
        console.log('SUCCESS FETCH')
        console.log(res)
        setFetchedMerchantProductParameters(res.object);
    }
    function onSuccessDelete(res){
        console.log('succesful delete');
        setUpdateFlag(true);
        setToolAlert({show:true,message: 'Başarıyla Silindi.',error:false}) 
    }
    function onFailPost(res){
        console.log(res);
        setToolAlert({show:true,message: 'Hata',error:true})   
    }
    function onFailFetch(res){
        console.log('FAILED FETCH')
        console.log(res)
    }
    function onFailedDelete(res){

    }
    const submit = ()=>{

        if (validated()){
                console.log('validation successful')
                POST_PARAMETER(merchantProductParameter,onSuccessPost,onFailPost);
            }
        else
            setToolAlert({show:true,message: 'Lütfen Tüm alanları girdiğinizden emin olunuz!',error:true})    



    }
    const clearForm = ()=>{
      setMerchantProductParameter(initialState);
    }
    const submitDeleteParameter=(index)=>{
        const productCode =  document.getElementById(`row_${index}-product-code`).innerText;
        const marketPlaceType = document.getElementById(`row_${index}-market-place-type`).innerText;
        console.log(`deleting ${productCode} with market place type ${marketPlaceType}`);
        DELETE_PARAMETER(productCode,marketPlaceType,onSuccessDelete,onFailedDelete);
    }
    console.log(merchantProductParameter);
    console.log(fetchedMerchantProductParameters);
    return (

        <div className="root">
            <AppAlert error = {toolAlert.error} message={toolAlert.message} show={toolAlert.show} setAlert={setToolAlert}></AppAlert>
            <div
              class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Barkod Kodu</span>
                <input
                  id="productCode"
                  onChange={e=>onChange(e.target.id,e.target.value)}
                  value = {merchantProductParameter.productCode}
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  
                />
              </label>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Ürün Linki</span>
                <input
                  id="productUrl"
                  value = {merchantProductParameter.productUrl}
                  onChange={e=>onChange(e.target.id,e.target.value)}
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                 
                />
              </label>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Fiyat Aralığı</span>
                <input
                  id="toleranceAmount"
                  value = {merchantProductParameter.toleranceAmount}
                  onChange={e=>onChange(e.target.id,e.target.value)}
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                 
                />
              </label>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Min Rekabet Fiyatı</span>
                <input
                  id="productAmountLowerBound"
                  value = {merchantProductParameter.productAmountLowerBound}
                  onChange={e=>onChange(e.target.id,e.target.value)}
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  
                />
              </label>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Max Rekabet Fiyatı</span>
                <input
                  id="productAmountUpperBound"
                  value = {merchantProductParameter.productAmountUpperBound}
                  onChange={e=>onChange(e.target.id,e.target.value)}
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                 
                />
              </label>                             
              <div class="mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Pazar Yeri
                </span>
                <div class="mt-2">
                  <label
                    class="inline-flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <input
                      id="marketPlaceType"
                      onChange={(e)=>onChange(e.target.name,'TRENDYOL')}
                      type="radio"
                      class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="marketPlaceType"
                      value={merchantProductParameter.marketPlaceType}
                      checked={merchantProductParameter.marketPlaceType==='TRENDYOL'}
                    />
                    <span id="marketPlaceVal" class="ml-2">TRENDYOL</span>
                  </label>
                  <label
                    class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400"
                  >
                    <input
                      id="marketPlaceType"
                      onChange={(e)=>onChange(e.target.name,'HEPSIBURADA')}
                      type="radio"
                      class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="marketPlaceType"
                      value={merchantProductParameter.marketPlaceType}
                      checked={merchantProductParameter.marketPlaceType!=='TRENDYOL'}
                    />
                    <span id="marketPlaceAltVal" class="ml-2">HEPSIBURADA</span>
                  </label>
                </div>
              </div>
              <button type="button" className="button" onClick={submit} >Kaydet</button>
              <button type="button" className="button clear" onClick={clearForm}>Temizle</button>
                          
            </div>
            <div className="parameterTable">
                <table>
                   <tr>
                        <th>Satici Platform ID</th>
                        <th>Barkod Kodu</th>
                        <th>Ürün Linki</th>
                        <th>Fiyat Aralığı</th>
                        <th>Min Rekabet Fiyatı</th>
                        <th>Max Rekabet Fiyatı</th>
                        <th>Pazar Yeri</th>
                        <th></th>
                    </tr>
                        {
                           fetchedMerchantProductParameters != null? fetchedMerchantProductParameters.map((item,index)=>{
                                return (
                                    <tr id={`row_${index}`} index={index}>
                                       <td>
                                        {
                                            item.merchantId
                                        }
                                        </td>
                                        <td id={`row_${index}-product-code`}>
                                        {
                                            item.productCode
                                        }    
                                        </td>
                                        <td>
                                            {
                                                item.productUrl
                                            }
                                        </td>
                                        <td>
                                            {
                                                item.toleranceAmount
                                            }
                                        </td>
                                        <td>
                                            {
                                                item.productAmountLowerBound
                                            }
                                        </td>
                                        <td>
                                            {
                                                item.productAmountUpperBound
                                            }
                                        </td>
                                        <td id={`row_${index}-market-place-type`}>
                                            {
                                                item.marketPlaceType
                                            }
                                        </td>
                                        <td>
                                        <button type="button" className="button clear" onClick={()=>submitDeleteParameter(index)}>Sil</button>
                                        </td>
                                    </tr>
                                    
                                )
                            }) : <></>
                        }
                </table>
            </div>
        </div>
    )
}