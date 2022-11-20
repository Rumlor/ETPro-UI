import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {useReducer, useRef, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";


function ShipmentInfoAccordion(props){
    const initialState = (indexOfShipment)=> {
     return    {
                    index:indexOfShipment,
                    amount:null,
                    isVolumeBasedPricing:false,
                    volumeInfo:{},
                    scaleInfo:{}
            }
    }
    const scaleInfoTextRef = useRef();
    const volumeInfoTextRef = useRef();
      const reducer = (state,action)=>{
        switch (action.type) {
            case 'amountChanged':
                return {...state,amount:action.amount}
            case 'isVolumeBasedPricingChanged':
                const updatedState = {...state}
                updatedState.scaleInfo = null
                updatedState.volumeInfo = null
                if (action.volumeBased){
                    scaleInfoTextRef.current.value = null
                } else {
                    volumeInfoTextRef.current.value = null
                }
                return {...state,...{...updatedState,isVolumeBasedPricing:action.volumeBased}}
            case 'scaleInfoChanged':
                return {...state,scaleInfo:{...state.scaleInfo,upperBound:action.scaleInfoUpperBound}}
            case 'volumeInfoChanged':
                return {...state,volumeInfo:{...state.volumeInfo,upperBound:action.volumeInfoUpperBound}}
        }
    }

    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [isSaveEvent,setIsSaveEvent] = useState(false)
    const [shipmentInfoExpanded,setShipmentInfoExpanded] = useState(false);
    const [shipmentInfo,setShipmentInfo] = useReducer(reducer,props.index,initialState)
    const[volumeBased,setVolumeBased] = useState(false);
    function saveEvent() {

        setIsSaveEvent(false)
        if (props.marketPlace.shipmentAmounts.findIndex(element=>element.index === props.index) === -1 ){
            console.log('shipment save event!!')
            setIsSaveEvent(true)
            const newShipmentsArray = [...props.marketPlace.shipmentAmounts]
            newShipmentsArray.push(shipmentInfo)
            props.setMarketPlace({...props.marketPlace,shipmentAmounts:newShipmentsArray})
        }
        else {
            console.log('shipment update event!!')
            const newShipmentsArray = [...props.marketPlace.shipmentAmounts]
            const newShipmentFromArray = {...props.marketPlace.shipmentAmounts[props.index]}
            newShipmentFromArray.amount = shipmentInfo.amount;
            newShipmentFromArray.scaleInfo = shipmentInfo.scaleInfo;
            newShipmentFromArray.volumeInfo = shipmentInfo.volumeInfo;
            newShipmentsArray[props.index] = newShipmentFromArray;

            props.setMarketPlace({...props.marketPlace,shipmentAmounts:newShipmentsArray})
        }
        setShowSuccessMessage(true);
    }
    function deleteEvent() {
        //add shipment to delete array
        const newArray = [...props.indexArray];
        newArray.push(props.index)
        props.setIndexArray(newArray)

        //delete shipment from marketplace

        if (props.marketPlace.shipmentAmounts.findIndex(element=>element.index === props.index) === -1){
            //do nothing. no record found for this shipment
        } else {
            let newArray = [...props.marketPlace.shipmentAmounts]
            newArray = newArray.filter(element=> element.index !== props.index)
            props.setMarketPlace({...props.marketPlace,shipmentAmounts: newArray})
        }
    }

    console.log('shipment '+props.index)
    console.log(shipmentInfo)
    console.log('success message :'+showSuccessMessage)
    return (
    <div style={{width:'50vw'}}>
        <Accordion expanded={shipmentInfoExpanded} onChange={()=>{
            if (shipmentInfoExpanded)
                setShipmentInfoExpanded(false)
            else
                setShipmentInfoExpanded(true)
        }}>
            <AccordionSummary   expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Kargo
                </Typography>
                <Typography sx={{ color: 'text.secondary' ,margin:'0px 0px 0px 10px'}}>Kargo Bilgileri</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <>
                    {
                        showSuccessMessage? <Alert  severity="success">{'Kargo bilgisi '+  (isSaveEvent? 'kaydedildi':'güncellendi')}</Alert>
                            :<></>
                    }

                </>
                {
                    <div className={"shipment-form"} >
                        <SaveIcon onClick={saveEvent}/>
                        <DeleteIcon onClick={deleteEvent} sx={{marginLeft:'25px'}}/>
                            <div className={'amount-checkbox'} style={{display:'flex'}}>
                                    <TextField
                                        name={'amount'}
                                        label="Tutar(TL)"
                                        onChange={e=>setShipmentInfo({type:'amountChanged',amount:e.target.value})}
                                    />
                                    <FormControlLabel sx={{marginLeft:'50px'}} control={<Checkbox/>} onClick={()=>
                                            {
                                                setShipmentInfo({type:'isVolumeBasedPricingChanged',volumeBased:!volumeBased});
                                                setVolumeBased(!volumeBased);
                                            }
                                        } checked={volumeBased} label="Desi Bazlı" />
                            </div>

                            <div className={'scale-volume-info'} >
                                {
                                    !volumeBased ? (
                                        <TextField
                                            name={'upperBound'}
                                            label="Kargo Barem"
                                            inputRef={scaleInfoTextRef}
                                            onChange={(e)=>setShipmentInfo({type:'scaleInfoChanged',scaleInfoUpperBound:e.target.value})}
                                        />
                                    ) :
                                        (
                                            <TextField
                                                name={'upperBound'}
                                                label="Desi Barem"
                                                inputRef={volumeInfoTextRef}
                                                onChange={e=>setShipmentInfo({type:'volumeInfoChanged',volumeInfoUpperBound:e.target.value})}
                                            />
                                        )
                                }
                            </div>

                    </div>
                }
            </AccordionDetails>
        </Accordion>
    </div>
    );
}
export default ShipmentInfoAccordion;