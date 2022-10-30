import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommissionInfo from "../commission/CommissionInfo";
import {useState} from "react";
import ShipmentInfo from "./ShipmentInfo";

function ShipmentInfoAccordion(props){
    const [shipmentInfoExpanded,setShipmentInfoExpanded] = useState(false);

    return (

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
                {
                    props.shipmentAmounts.map ((shipment,index) =>
                        (
                            <ShipmentInfo shipment = {shipment} shipmentIndex = {index} isVolumeBased={shipment.isVolumeBasedPricing} ></ShipmentInfo>
                        )
                    )
                }
            </AccordionDetails>
        </Accordion>
    );
}
export default ShipmentInfoAccordion;