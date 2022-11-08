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

import {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";


function ShipmentInfoAccordion(props){
    const initialState = {
        index:props.index,
        amount:null,
        isVolumeBasedPricing:false,
        volumeInfo :{},
        scaleInfo:{}
    }
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [isSaveEvent,setIsSaveEvent] = useState(false)
    const [isUpdateEvent,setIsUpdateEvent] = useState(false)
    const [shipmentInfoExpanded,setShipmentInfoExpanded] = useState(false);
    const [shipmentInfo,setShipmentInfo] = useState(initialState)
    const[volumeBased,setVolumeBased] = useState(false);
    const  handleVolumeBased = ()=>{
        setVolumeBased(!volumeBased);
        setShipmentInfo({...shipmentInfo,isVolumeBasedPricing:!volumeBased})
    };
    function handleChange(e) {
        setShipmentInfo({...shipmentInfo,[e.target.name]:e.target.value});
    }
    function handleScaleInfoChange(e) {
        setShipmentInfo({...shipmentInfo,scaleInfo: {...shipmentInfo.scaleInfo,[e.target.name]:e.target.value}})
    }
    function handleVolumeInfoChange(e) {
        setShipmentInfo({...shipmentInfo,volumeInfo: {...shipmentInfo.volumeInfo,[e.target.name]:e.target.value}})
    }

    console.log('shipment '+props.index)
    console.log(shipmentInfo)
    console.log('success message'+showSuccessMessage)
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
                                        onChange={handleChange}
                                    />
                                    <FormControlLabel sx={{marginLeft:'50px'}} control={<Checkbox/>} onClick={handleVolumeBased} checked={volumeBased} label="Desi Bazlı" />
                            </div>

                            <div className={'scale-volume-info'} >
                                {
                                    !volumeBased ? (
                                        <TextField
                                            name={'upperBound'}
                                            label="Kargo Barem"
                                            onChange={handleScaleInfoChange}
                                        />
                                    ) :
                                        (
                                            <TextField
                                                name={'upperBound'}
                                                label="Desi Barem"
                                                onChange={handleVolumeInfoChange}
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