import { useEffect, useState } from "react"
import { DELETE_PARAMETER, GET_PARAMETERS, POST_PARAMETER } from "../../api/JobApi"
import AppAlert from "../AppAlert"
import "./MarketPlaceTool.css"
import $ from 'jquery'
export default function MarketPlaceTool(){

    const initialState = {
        merchantId:'',
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
        return merchantProductParameter.merchantId.length > 0 &&
            parseFloat(merchantProductParameter.productAmountLowerBound) > 0 &&
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
            <form>
                <fieldset>
                    <legend>Bildirim Ürünü Oluştur</legend>
                    <ul>
                        <li style={{marginTop:10}}>
                        <label  for="merchantId">Platform Satıcı ID:</label>
                        <input  value={merchantProductParameter.merchantId} onChange={(e)=>onChange(e.target.id,e.target.value)} style={{marginLeft:15}} type="text" id="merchantId" name="merchantId" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="productCode">Barkod Kodu:</label>
                        <input value={merchantProductParameter.productCode} onChange={(e)=>onChange(e.target.id,e.target.value)} style={{marginLeft:55}} type="text" id="productCode" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="productUrl">Ürün Linki:</label>
                        <input  value={merchantProductParameter.productUrl} onChange={(e)=>onChange(e.target.id,e.target.value)}  style={{marginLeft:75}} type="text" id="productUrl" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="toleranceAmount">Fiyat Aralığı:</label>
                        <input  value={merchantProductParameter.toleranceAmount} onChange={(e)=>onChange(e.target.id,e.target.value)} style={{marginLeft:60}} type="text" id="toleranceAmount" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="productAmountUpperBound">Max Rekabet Fiyatı:</label>
                        <input  value={merchantProductParameter.productAmountUpperBound} onChange={e=>onChange(e.target.id,e.target.value)} type="text" id="productAmountUpperBound" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="productAmountLowerBound">Min Rekabet Fiyatı:</label>
                        <input  value={merchantProductParameter.productAmountLowerBound} onChange={e=>onChange(e.target.id,e.target.value)} style={{marginLeft:3}} type="text" id="productAmountLowerBound" required/>
                        </li>
                        <li style={{marginTop:10}}>
                        <label  for="priceLowestLimit">Platform:</label>
                        <select onChange={e=>onChange('marketPlaceType',e.target.value)} value={merchantProductParameter.marketPlaceType}  style={{marginLeft:5}}>
                            <option  value="TRENDYOL">TRENDYOL</option>
                            <option  value="HEPSIBURADA">HEPSIBURADA</option>
                        </select>
                        </li>
                    </ul>
                </fieldset>
                <button  type="button" className="button" onClick={submit}>Kaydet</button>
                <button type="button" className="button clear" onClick={()=>setMerchantProductParameter(initialState)}>Temizle</button>
            </form>
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