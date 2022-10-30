import {Divider, Grid, Typography} from "@mui/material";

function VolumeInfo(props){

    console.log('data'+props);
    if (props.volumeInfo != null) {
                return (
                    <Grid>
                        <Grid item xs={"auto"}>
                            <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Desi</Typography>
                            <Divider/>

                            <div style={{display:'flex'}}>
                                <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Alt Sınır</Typography>
                                <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{props.volumeInfo.lowerBound}</Typography>
                            </div>
                            <div style={{display:'flex'}}>
                                <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Üst Sınır</Typography>
                                <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{props.volumeInfo.upperBound}</Typography>
                            </div>

                        </Grid>

                    </Grid>
                );
    }
}
export default VolumeInfo;