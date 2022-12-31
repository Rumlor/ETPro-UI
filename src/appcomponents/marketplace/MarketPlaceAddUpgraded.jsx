import { Component } from "react";
import MarketPlaceAddCommissionTable from "./MarketPlaceAddCommissionTable";
import MarketPlaceAddShipmentTable from "./MarketPlaceAddShipmentTable";
import AppAlert from "../AppAlert"
import { apiDelegateService } from "../../api/ApiDelegateService";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil"
export default class MarketPlaceAddUpgraded extends Component {

    postMarketPlace = apiDelegateService.marketPlaceApi.postMarketPlace
    state = {
        platformName : null ,
        commissionAmounts : [],
        shipmentAmounts : [],
        showAlert : false,
        alertMessage : null,
        alertError:false
    }
    validateState(marketPlace){
        const  platformName  = marketPlace.platformName;
        const shipmentInfos = marketPlace.shipmentAmounts;
        const commissionInfos = marketPlace.commissionAmounts;
        const result = {result:true,message:''}
    
        if (platformName == null || platformName === ''){
            result.result = false
            result.message = 'Lütfen Pazar yeri adını giriniz.'
        }
        else if (shipmentInfos == null || shipmentInfos.length === 0) {
            result.result = false;
            result.message = 'Lütfen en az bir adet kargo bilgisi giriniz.'
        } else if (shipmentInfos.findIndex(shipment=>shipment.amount == null) !==-1 ){
            result.result = false;
            result.message = 'Lütfen kargo tutarlarınızı kontrol ediniz.'
        } else if (shipmentInfos.findIndex(shipment=>(shipment.isVolumeBasedPricing && (shipment.volumeInfo == null || shipment.volumeInfo.upperBound == null) ))!== -1){
            result.result = false;
            result.message = 'Lütfen desi bazlı kargoların desi bilgilerini kontrol ediniz.'
        } else if (shipmentInfos.findIndex(shipment=>(!shipment.isVolumeBasedPricing && (shipment.scaleInfo == null || shipment.scaleInfo.upperBound == null) ))!== -1){
            result.result = false;
            result.message = 'Lütfen barem bazlı kargoların barem bilgilerini kontrol ediniz.'
        }
        else if (commissionInfos == null || commissionInfos.length === 0) {
            result.result = false;
            result.message = 'Lütfen en az bir adet komisyon bilgisi giriniz.'
        } else if (commissionInfos.findIndex(commission=>commission.percent == null) !== -1){
            result.result = false;
            result.message = 'Lütfen komisyon yüzdeleriniz kontrol ediniz.'
        }
        else if (commissionInfos.findIndex(element=>(element.isCategoryBasedPricing) && (element.categoryInfos === null || element.categoryInfos[0].categoryName === null)) !== -1){
            result.result = false
            result.message = 'Lütfen kategorili komisyonların kategori bilgisini girdiğinizden emin olun.'
        }
        return result;
    }
    filterCommissionsAndShipments(marketPlace){
        marketPlace.shipmentAmounts.forEach(item=>{
            if(item.isVolumeBasedPricing)
                item.scaleInfo.upperBound = null
            else 
                item.volumeInfo.upperBound = null    
        })
        marketPlace.commissionAmounts.forEach(item=>{
            if(!item.isCategoryBasedPricing)
                item.categoryInfos.categoryName = null
        })
    }
    onApiSuccess(res){
        this.setState({
            ...this.state,
            showAlert:true,
            alertMessage:'Pazar Yeri Başarıyla kaydedildi.'})
    }
    onApiFail(res){
        this.setState({
            ...this.state,
            showAlert:true,
            alertMessage: res.message,
            alertError : true })
    }
    alertHandler(alertObj){
        console.log(this)
        this.setState({
            ...this.state,
            showAlert:alertObj.show,
            alertMessage:alertObj.message
        })
    }

    submit(){
        // before submitting check volumebasedStatus
        const copiedShipmentState =  [...this.state.shipmentAmounts]
        const copiedCommission =  [...this.state.commissionAmounts]
        const marketPlace = {
            platformName : this.state.platformName,
            commissionAmounts : copiedCommission ,
            shipmentAmounts :copiedShipmentState }
        this.filterCommissionsAndShipments(marketPlace)
        const validationResult = this.validateState(marketPlace)    
        if (validationResult.result) {
            ComponentPromiseUtil.resolveResponse(this.postMarketPlace(marketPlace),this.onApiSuccess.bind(this),this.onApiFail.bind(this));
        } else {
            this.onApiFail(validationResult)
        }
    }
    render () {
        console.log('global state')
        console.log(this.state)
        return (
            <div>
                <AppAlert 
                show={this.state.showAlert}
                setAlert={this.alertHandler.bind(this)} 
                message = {this.state.alertMessage}
                error={this.state.alertError}/>
                <div
                class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                <label class="block text-sm">
                    
                    <span class="text-gray-700 dark:text-gray-400">Pazar Yeri</span>
                    <input
                    onChange={(e)=>{
                        this.setState({...this.state, platformName:e.target.value!== '' ? e.target.value:null})
                    }}
                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Hepsiburada,Trendyol vb."
                    />
                </label>
                <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Kargo Bilgisi</span>
                </label>
                <MarketPlaceAddShipmentTable  
                    marketPlaceDTO = {this.state} 
                    setMarketPlaceDTO = {this.setState.bind(this)} />
                <label class="block text-sm">
                    <span class="text-gray-700 dark:text-gray-400">Komisyon Bilgisi</span>
                </label>
                <MarketPlaceAddCommissionTable 
                    marketPlaceDTO = {this.state} 
                    setMarketPlaceDTO = {this.setState.bind(this)} />
                </div>
                <button 
                    style={{marginLeft:520}}
                    class="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    onClick={()=>this.submit()}
                    >
                    Kaydet
                </button>
            </div>
        )
    }
}