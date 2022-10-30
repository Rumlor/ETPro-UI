import {Divider, Grid, Typography} from "@mui/material";

function ScaleInfo(props){

    if (props.scaleInfo != null){
        return (
            <Grid>
                <Grid item xs={"auto"}>
                    <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Barem</Typography>
                    <Divider/>

                    <div style={{display:'flex'}}>
                        <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Alt Sınır</Typography>
                        <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{props.scaleInfo.lowerBound}</Typography>
                    </div>
                    <div style={{display:'flex'}}>
                        <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Üst Sınır</Typography>
                        <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{props.scaleInfo.upperBound != null ? props.scaleInfo.upperBound : '---------' }</Typography>
                    </div>

                </Grid>

            </Grid>
        );
    }
}
export default ScaleInfo;