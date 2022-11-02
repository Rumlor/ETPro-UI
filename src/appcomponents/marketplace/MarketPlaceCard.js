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
import CommissionInfoAccordion from "../commission/CommissionInfoAccordion";
import ShipmentInfoAccordion from "../shipment/ShipmentInfoAccordion";
import "./MarketPlaceCard.css"
function MarketPlaceCard(props){
    //mock data

    return (

        <Card key={props.marketPlace.platformName} sx={{ width: 400}} className="marketplace-card">
            <CardHeader title={
                <Typography variant={"h5"}>{props.marketPlace.platformName}</Typography>
            }  action={
                <IconButton aria-label={"settings"}>
                    <SettingsIcon>
                    </SettingsIcon>
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