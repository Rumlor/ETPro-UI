import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import "./MarketPlaceAdd.css";
import ShipmentInfoAccordion from "../shipment/ShipmentInfoAccordion";
import CommissionInfoAccordion from "../commission/CommissionInfoAccordion";




export default function MarketPlaceAdd(){

    const initial = {
        platformName:null,
        commissionAmounts: [],
        shipmentAmounts: []
    };
    const [marketPlace,setMarketPlace] = useState(initial);

    const [commissionCounter,setCommissionCounter] = useState(0);
    const [shipmentCounter,setShipmentCounter] = useState(0);
    const addCommission = ()=>{setCommissionCounter(commissionCounter+1)};
    const addShipment = ()=>{setShipmentCounter(shipmentCounter+1)};
    const resetAll = ()=>{setCommissionCounter(0);setShipmentCounter(0);setMarketPlace(initial);}
    console.log('marketplace');
    console.log(marketPlace);
    return (

            <Box  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off">

                <div className={'platformName'} style={{display:'flex',justifyContent:'center'}}>
                    <TextField
                        required
                        hidden
                        name={"platformName"}
                        label="Platform adı"
                        onChange={e=>setMarketPlace({...marketPlace,[e.target.name]:e.target.value})}
                    />
                </div>
                    <br/>
                    <div className={'buttons'} style={{display:'flex',justifyContent:'center'}}>
                    <Button variant="outlined" sx = {{width:'170px',height:'50px'}} onClick={addCommission}>Komisyon Ekle</Button>
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

    );
}