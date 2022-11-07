import {
    Alert, Backdrop,
    Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade,
    TextField,
} from "@mui/material";
import {useRef, useState} from "react";
import "./MarketPlaceAdd.css";
import ShipmentInfoAccordion from "../shipment/ShipmentInfoAccordion";
import CommissionInfoAccordion from "../commission/CommissionInfoAccordion";

import  {POST_MARKETPLACE} from "../../api/MarketplaceApi";




export default function MarketPlaceAdd(){
    const platformNameRef = useRef();
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
    const [indexArrayForDeleted,setIndexArrayForDeleted] = useState([])
    const [showLoadingScreen,setShowLoadingScreen] = useState(false);
    const [marketPlace,setMarketPlace] = useState(initial);
    const [isSaveDialogOpen,setIsSaveDialogOpen] = useState(false)
    const [commissionCounter,setCommissionCounter] = useState(0);
    const [shipmentCounter,setShipmentCounter] = useState(0);
    const addCommission = ()=>{setCommissionCounter(commissionCounter+1)};
    const addShipment = ()=>{setShipmentCounter(shipmentCounter+1)};
    const resetAll = ()=>{setCommissionCounter(0);setShipmentCounter(0);setMarketPlace(initial);platformNameRef.current.value = ''}

function onApiFail(response){
    setShowLoadingScreen(false);
    setShowApiFail(true)
    console.log(response)
    setShowFailMessage(response.errorMessage)
}
function onApiSuccess(response){
        //clear previous state from previous api call
   setShowApiFail(false)
   setShowLoadingScreen(false);
   setShowApiSuccess(true)
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
        POST_MARKETPLACE(marketPlace,onApiSuccess, onApiFail)
        setIsSaveDialogOpen(false)
    } else {
        setShowApiFail(true)
        setIsSaveDialogOpen(false)
        setShowFailMessage(validationResult.message)
        setShowLoadingScreen(false);
    }
}

console.log('marketplace');
console.log(marketPlace);
console.log('api success:'+showApiSuccess+' api fail:'+showApiFail)

    return (
            <div>
                <div style={(showApiSuccess || showApiFail) ? {visibility:'visible'}:{visibility: 'hidden'}}>
                    {

                    showApiSuccess&&!showApiFail?
                            <Fade in={showApiSuccess}  addEndListener={()=>setTimeout(()=>setShowApiSuccess(false),2000)} exit={true} unmountOnExit={true} timeout={{enter:1000,exit:0}}  >
                                    <Alert

                                    action={
                                        <Button color="inherit" size="small" onClick={()=>{setShowApiSuccess(false);setShowApiFail(false)}}>
                                            Kapat
                                        </Button>
                                    }
                                >
                                    Pazar yeri başarıyla kaydedildi!
                                </Alert>
                            </Fade>
                        :
                           <Fade  in={showApiFail}  addEndListener={()=>setTimeout(()=>setShowApiFail(false),2000)} exit={true} unmountOnExit={true} timeout={{enter:1000,exit:0}}   >
                                <Alert color={"error"}
                                    action={
                                        <Button color="inherit" size="medium" onClick={()=>{setShowApiSuccess(false);setShowApiFail(false)}}>
                                            Kapat
                                        </Button>
                                    }
                                >
                                    {'Hata: '+showFailMessage}
                                </Alert>
                           </Fade>
                    }
                </div>
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
                            <Button variant="outlined" sx = {{width:'170px',height:'50px',marginLeft:'25px'}} onClick={addCommission}>Komisyon Ekle</Button>
                            <Button variant="outlined"  onClick={addShipment} sx={{marginLeft:'25px',width:'150px',height:'50px'}}>Kargo Ekle</Button>
                            <Button variant="outlined"    sx = {{marginLeft:'25px',width:'170px',height:'50px'}} onClick={resetAll}>Sıfırla</Button>
                        </div>

                    <div className={"commission-shipment-tabs"} style={{marginTop:'15px'}}>
                        <div className={"comms"} style={{float:"left"}}>
                            {
                                Array(commissionCounter).fill().map((i,index)=> (
                                    indexArrayForDeleted.findIndex(element=>element === index) === -1 ?
                                    <CommissionInfoAccordion
                                        index = {index}
                                        setIndexArray={setIndexArrayForDeleted}
                                        indexArray={indexArrayForDeleted}
                                        marketPlace = {marketPlace}
                                        setMarketPlace = {setMarketPlace}/> : <></>
                                ))
                            }
                        </div>
                        <div className={"shipments"} style={{float:'right'}}>
                            {
                                Array(shipmentCounter).fill().map((i,index)=> (
                                    <ShipmentInfoAccordion
                                        index = {index}
                                        marketPlace = {marketPlace}
                                        setMarketPlace = {setMarketPlace}/>
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