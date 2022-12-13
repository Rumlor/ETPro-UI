import { useState } from "react"
import { POST_PARAMETER } from "../../api/JobApi"
import AppAlert from "../AppAlert"
import "./MarketPlaceTool.css"
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
    const [merchantProductParameter,setMerchantProductParameter] = useState(initialState)
    const [toolAlert,setToolAlert] = useState({show:false,message:null,error:true})
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
    function onSuccess(res){
        console.log(res);
        setToolAlert({show:true,message: 'Başarıyla Kaydedildi.',error:false})   
    }
    function onFail(res){
        console.log(res);
        setToolAlert({show:true,message: 'Hata',error:true})   
    }


    console.log(merchantProductParameter);
    const submit = ()=>{

        if (validated()){
                console.log('validation successful')
                POST_PARAMETER(merchantProductParameter,onSuccess,onFail);
            }
        else
            setToolAlert({show:true,message: 'Lütfen Tüm alanları girdiğinizden emin olunuz!',error:true})    



    }

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
            
        </div>
    )
}