import {Divider, Grid, Typography} from "@mui/material";

function CommissionInfo(props){


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
    );
}
export default CommissionInfo;