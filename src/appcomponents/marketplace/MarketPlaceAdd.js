import {
    Alert,
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
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
    const [isFailedValidation,setIsFailedValidation] = useState(false)
    const [marketPlace,setMarketPlace] = useState(initial);
    const [isSaveDialogOpen,setIsSaveDialogOpen] = useState(false)
    const [commissionCounter,setCommissionCounter] = useState(0);
    const [shipmentCounter,setShipmentCounter] = useState(0);
    const addCommission = ()=>{setCommissionCounter(commissionCounter+1)};
    const addShipment = ()=>{setShipmentCounter(shipmentCounter+1)};
    const resetAll = ()=>{setCommissionCounter(0);setShipmentCounter(0);setMarketPlace(initial);platformNameRef.current.value = ''}

function onApiFail(response){
    setShowApiFail(true)
    console.log(response)
    setShowFailMessage(response.errorMessage)
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
    } else if (commissionInfos == null || commissionInfos.length === 0) {
        result.result = false;
        result.message = 'Lütfen en az bir adet komisyon bilgisi giriniz.'
    } else if (commissionInfos.findIndex(element=>element.isCategoryBasedPricing && (element.categoryInfos === null || element.categoryInfos.categoryName === null))){
        result.result = false
        result.message = 'Lütfen kategorili komisyonların kategori bilgisini girdiğinizden emin olun.'
    }
    return result;
}

function saveMarketPlaceAPI() {
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
        POST_MARKETPLACE(marketPlace, setShowApiSuccess, onApiFail)
        setIsSaveDialogOpen(false)
    } else {
        setShowApiFail(true)
        setIsSaveDialogOpen(false)
        setShowFailMessage(validationResult.message)

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

                                <Alert
                                action={
                                    <Button color="inherit" size="small" onClick={()=>{setShowApiSuccess(false);setShowApiFail(false)}}>
                                        Kapat
                                    </Button>
                                }
                            >
                                Pazar yeri başarıyla kaydedildi!
                            </Alert>
                        :
                            <Alert color={"error"}
                                action={
                                    <Button color="inherit" size="medium" onClick={()=>{setShowApiSuccess(false);setShowApiFail(false)}}>
                                        Kapat
                                    </Button>
                                }
                            >
                                {'Hata: '+showFailMessage}
                            </Alert>
                    }
                </div>

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
                                    <CommissionInfoAccordion
                                        index = {index}
                                        marketPlace = {marketPlace}
                                        setMarketPlace = {setMarketPlace}/>
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