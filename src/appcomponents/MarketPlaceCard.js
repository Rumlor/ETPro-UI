import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Card,
    CardContent,
    CardHeader, Divider, Grid,
    IconButton,
    Typography
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {useState} from "react";
import CommissionInfoAccordion from "./commission/CommissionInfoAccordion";
import ShipmentInfoAccordion from "./shipment/ShipmentInfoAccordion";

function MarketPlaceCard(props){
    //mock data
const [commissionExpanded,setCommissionExpanded] = useState(false)

    function isCategoryBased(isCategoryBasedPricing) {

        if(isCategoryBasedPricing)
            return "Evet";
        else
            return "Hayır";
    }

    return (

        <Card key={props.marketPlace.platformName} sx={{ maxWidth: 400}}>
            <CardHeader title={
                <Typography variant={"h5"}>{props.marketPlace.platformName}</Typography>
            }  action={
                <IconButton aria-label={"settings"}>
                    <SettingsIcon></SettingsIcon>
                </IconButton>}
            />
            <CardContent >
                <CommissionInfoAccordion commissionAmounts={props.marketPlace.commissionAmounts}></CommissionInfoAccordion>
                <ShipmentInfoAccordion shipmentAmounts = {props.marketPlace.shipmentAmounts}></ShipmentInfoAccordion>
            </CardContent>

        </Card>
    );
}

export default MarketPlaceCard;