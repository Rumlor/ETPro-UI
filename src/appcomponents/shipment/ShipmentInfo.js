import {Divider, Grid, Typography} from "@mui/material";
import VolumeInfo from "./volume/VolumeInfo";
import ScaleInfo from "./volume/ScaleInfo";

function ShipmentInfo(props){

    function isVolumeBased(isVolumeBasedPricing) {
        if (isVolumeBasedPricing)
            return "Evet";
        else
            return "Hayır";
    }

    return (
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
    );
}
export default ShipmentInfo;