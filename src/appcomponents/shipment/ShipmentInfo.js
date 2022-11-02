import {Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography} from "@mui/material";
import VolumeInfo from "./volume/VolumeInfo";
import ScaleInfo from "./volume/ScaleInfo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

function ShipmentInfo(props){

    const [shipmentInfoExpanded,setShipmentInfoExpanded] = useState(false);

    function isVolumeBased(isVolumeBasedPricing) {
        if (isVolumeBasedPricing)
            return "Evet";
        else
            return "Hayır";
    }

    return (
        <Accordion expanded={shipmentInfoExpanded} onChange={()=>{
            if (shipmentInfoExpanded)
                setShipmentInfoExpanded(false)
            else
                setShipmentInfoExpanded(true)
        }}>
            <AccordionSummary   expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '45%', flexShrink: 0 }}>
                    {props.isVolumeBased ? 'Desi Bilgisi' : 'Barem Bilgisi'}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid>
                    <Grid item xs={"auto"}>
                        <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Kargo</Typography>
                        <Divider/>

                        <div style={{display:'flex'}}>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Tutar:</Typography>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{props.shipment.amount} TL</Typography>
                        </div>
                        <div style={{display:'flex'}}>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Desi Bazlı:</Typography>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{isVolumeBased(props.shipment.isVolumeBasedPricing)}</Typography>
                        </div>

                        <div>
                            <ScaleInfo scaleInfo = {props.shipment.scaleInfo}></ScaleInfo>
                        </div>

                        <div>
                            <VolumeInfo volumeInfo = {props.shipment.volumeInfo}></VolumeInfo>
                        </div>

                    </Grid>

                </Grid>
            </AccordionDetails>
        </Accordion>

    );
}
export default ShipmentInfo;