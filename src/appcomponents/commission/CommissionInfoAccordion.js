import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommissionInfo from "./CommissionInfo";
import {useState} from "react";

function CommissionInfoAccordion(props){

    const [commissionExpanded,setCommissionExpanded] = useState(false)

    function isCategoryBased(isCategoryBasedPricing) {

        if(isCategoryBasedPricing)
            return "Evet";
        else
            return "Hayır";
    }

    return(
        <Accordion expanded={commissionExpanded} onChange={()=>{
            if (commissionExpanded)
                setCommissionExpanded(false)
            else
                setCommissionExpanded(true)
        }}>
            <AccordionSummary   expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Komisyon
                </Typography>
                <Typography sx={{ color: 'text.secondary' ,margin:'0px 0px 0px 10px'}}>Komisyon Bilgileri</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    props.commissionAmounts.map(commission =>
                        (
                            <CommissionInfo commission = {commission}></CommissionInfo>
                        )
                    )
                }
            </AccordionDetails>
        </Accordion>
    );
}
export default CommissionInfoAccordion;
