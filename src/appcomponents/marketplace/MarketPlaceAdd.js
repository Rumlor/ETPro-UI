import {
    Alert, Backdrop,
    Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from "@mui/material";
import {useRef, useState} from "react";
import "./MarketPlaceAdd.css";
import ShipmentInfoAccordion from "../shipment/ShipmentInfoAccordion";
import CommissionInfoAccordion from "../commission/CommissionInfoAccordion";
import ComponentPromiseUtil from "../../api/ComponentPromiseUtil";
import { apiDelegateService} from "../../api/ApiDelegateService";
import {CSSTransition} from "react-transition-group";
import { useNavigate } from "react-router-dom";




export default function MarketPlaceAdd(){
    const platformNameRef = useRef();
    const {postMarketPlace} = apiDelegateService.marketPlaceApi;
    const initial = {
        platformName:null,
        commissionAmounts: [],
        shipmentAmounts: []
    };
    // successful add operation alert
    const[showApiSuccess,setShowApiSuccess] = useState(false)
    // failed add operation alert
    const[showApiFail,setShowApiFail] = useState(false)
    //failed app operation message
    const [showFailMessage,setShowFailMessage] = useState("")
    // loading screen for add api call
    const [toggleTransition,setToggleTransition] = useState(false)
    const [commissionIndexArrayForDeleted,setCommissionIndexArrayForDeleted] = useState([])
    const [shipmentIndexArrayForDeleted,setShipmentIndexArrayForDeleted] = useState([])
    const [showLoadingScreen,setShowLoadingScreen] = useState(false);
    const [marketPlace,setMarketPlace] = useState(initial);
    const [isSaveDialogOpen,setIsSaveDialogOpen] = useState(false)
    const [commissionCounter,setCommissionCounter] = useState(0);
    const [shipmentCounter,setShipmentCounter] = useState(0);
    const addCommission = ()=>{setCommissionCounter(commissionCounter+1)};
    const addShipment = ()=>{setShipmentCounter(shipmentCounter+1)};
    const resetAll = ()=>{setCommissionCounter(0);setShipmentCounter(0);setMarketPlace(initial); setCommissionIndexArrayForDeleted([]);setShipmentIndexArrayForDeleted([]); platformNameRef.current.value = ''}
    const navigator = useNavigate();
function onApiFail(response){
    if (response.object === 'RELOGIN_REQUIRED'){
        navigator("/login");
    } 
    else {
        setShowLoadingScreen(false);
        setShowApiFail(true)
        console.log(response)
        if (response.errorMessage === undefined)
        {
            response.errorMessage = 'Server Bağlantısı sağlanamadı. Lütfen daha sonra tekrar deneyiniz.'
        }
        setToggleTransition(true)
        setShowFailMessage(response.errorMessage)
    }
}
function onApiSuccess(response){
        //clear previous state from previous api call
    setShowApiSuccess(true)
    setShowApiFail(false)
    setShowLoadingScreen(false);
    setToggleTransition(true)

}
function validateState() {
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
function saveMarketPlaceAPI() {
    setShowLoadingScreen(true)
    const mutatedMarketPlace = {...marketPlace}
    if (mutatedMarketPlace.commissionAmounts.findIndex(x=>Array.isArray(x.categoryInfos)) === -1){
        console.log('====MUTATING=====')
        mutatedMarketPlace.commissionAmounts.forEach(element=>{
            if (element.categoryInfos != null) {
                element.categoryInfos = [element.categoryInfos]
            }
        })
        setMarketPlace(mutatedMarketPlace)
    }
       const validationResult =  validateState();
    if (validationResult.result) {
        ComponentPromiseUtil.resolveResponse(postMarketPlace(marketPlace),onApiSuccess,onApiFail);
        setIsSaveDialogOpen(false)
    } else {
        setShowApiFail(true)
        setIsSaveDialogOpen(false)
        setShowFailMessage(validationResult.message)
        setShowLoadingScreen(false);
        setToggleTransition(true)
    }
}
console.log('marketplace');
console.log(marketPlace);
console.log(`commission counter: ${commissionCounter}, shipment counter: ${shipmentCounter}`)
console.log(`commission index for delete : ${commissionIndexArrayForDeleted}, shipment index for delete: ${shipmentIndexArrayForDeleted}`)
console.log('api success:'+showApiSuccess+' api fail:'+showApiFail)

    return (
            <div>
                <CSSTransition
                    //1. enter/exit state
                    in={toggleTransition}
                    //2. transition durations
                    timeout={2000}
                    //3. classname prefix
                    classNames={"api-fail-transition"}
                    // add event listener
                    addEndListener={()=>setTimeout(()=>{setToggleTransition(false);},2100)}
                    unmountOnExit
                >
                    <div>
                                <Alert
                                    sx={{display:'flex',justifyContent:'center'}}
                                    color={showApiSuccess?'success':'error'}
                                    icon={false} >
                                    <p>{showApiSuccess?`${marketPlace.platformName} başarıyla kaydedildi.`:`Hata: ${showFailMessage}`}</p>
                                </Alert>
                    </div>
                </CSSTransition>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={showLoadingScreen}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box  component="form"
                      sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' }
                      }}
                      noValidate
                      autoComplete="off">

                    <div className={'platformName'} style={{display:'flex',justifyContent:'center'}}>
                        <TextField
                            required
                            inputRef={platformNameRef}
                            name={"platformName"}
                            label="Platform adı"
                            onChange={e=>setMarketPlace({...marketPlace,[e.target.name]:e.target.value})}
                        />
                    </div>
                        <br/>
                        <div className={'buttons'} style={{display:'flex',justifyContent:'center'}}>
                            <Button variant="contained" color={'success'} sx = {{width:'170px',height:'50px',justifyContent:'center',display:'flex'}} onClick={()=>setIsSaveDialogOpen(true)}>Onayla</Button>
                            <Button variant="outlined"  sx = {{width:'170px',height:'50px',marginLeft:'25px'}} onClick={addCommission}>Komisyon Ekle</Button>
                            <Button variant="outlined"  sx={{marginLeft:'25px',width:'150px',height:'50px'}}   onClick={addShipment} >Kargo Ekle</Button>
                            <Button variant="outlined"  sx = {{marginLeft:'25px',width:'170px',height:'50px'}} onClick={resetAll}>Sıfırla</Button>
                        </div>

                    <div className={"commission-shipment-tabs"} style={{marginTop:'15px'}}>
                        <div className={"comms"} style={{float:"left"}}>
                            {
                                Array(commissionCounter).fill().map((i,index)=> (
                                    commissionIndexArrayForDeleted.findIndex(element=>element === index) === -1 ?
                                    <CommissionInfoAccordion
                                        index = {index}
                                        setIndexArray={setCommissionIndexArrayForDeleted}
                                        indexArray={commissionIndexArrayForDeleted}
                                        marketPlace = {marketPlace}
                                        setMarketPlace = {setMarketPlace}/> : <></>
                                ))
                            }
                        </div>
                        <div className={"shipments"} style={{float:'right'}}>
                            {
                                Array(shipmentCounter).fill().map((i,index)=> (
                                    shipmentIndexArrayForDeleted.findIndex(element=>element === index) === -1 ?
                                    <ShipmentInfoAccordion
                                        index = {index}
                                        marketPlace = {marketPlace}
                                        setIndexArray={setShipmentIndexArrayForDeleted}
                                        indexArray={shipmentIndexArrayForDeleted}
                                        setMarketPlace = {setMarketPlace}/>  : <></>
                                ))
                            }
                        </div>
                    </div>
                </Box>
                <Dialog open={isSaveDialogOpen}>
                    <DialogTitle id="alert-dialog-title">
                        {`Kayıt Onayı`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Pazar yeri ${marketPlace.platformName} kaydedilecek. Onaylıyor musunuz?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setIsSaveDialogOpen(false)}>Vazgeç</Button>
                        <Button onClick={saveMarketPlaceAPI} autoFocus>
                            Onayla
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>


    );
}