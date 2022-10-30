import {Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useState} from "react";

function CommissionInfo(props){

    const [commissionExpanded,setCommissionExpanded]  = useState(false);

    function isCategoryBased(isCategoryBasedPricing) {

        if(isCategoryBasedPricing)
            return "Evet";
        else
            return "Hayır";
    }

    function sortCategories(categoryInfos) {
        if (categoryInfos == null)
            return "---------";
        else
           return  categoryInfos.map(info=>info.categoryName).join();
    }

    return (
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
                <Typography sx={{ color: 'text.secondary' ,margin:'0px 0px 0px 10px'}}>Fiyatlandırma</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid>
                    <Grid item xs={"auto"}>
                        <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Komisyon</Typography>
                        <Divider/>
                        <div style={{display:'flex'}}>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Yüzde:</Typography>
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>% {props.commission.percent}</Typography>
                        </div>


                        <div style={{display:'flex'}} >
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Kategori Bazlı:</Typography>
                            <Typography variant={"body2"} color="darkred" sx={{ typography: 'subtitle2', fontFamily: 'Monospace' ,padding:'0 -10px'}} >{isCategoryBased(props.commission.isCategoryBasedPricing)}</Typography>

                        </div>

                        <div style={{display:'flex'}} >
                            <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Kategori Türü:</Typography>
                            <Typography variant={"body2"} color="darkred" sx={{ typography: 'subtitle2', fontFamily: 'Monospace' ,padding:'0 -10px'}} >{sortCategories(props.commission.categoryInfos)}</Typography>

                        </div>


                    </Grid>

                </Grid>
            </AccordionDetails>
        </Accordion>

    );
}
export default CommissionInfo;