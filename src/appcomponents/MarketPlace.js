
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container, Divider,
    Grid,
    Icon,
    IconButton,
    SpeedDialIcon,
    Typography
} from "@mui/material";
import {useState} from "react";
import marketplacesJSON from "./data/marketplaces.json";
import SettingsIcon from "@mui/icons-material/Settings";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function MarketPlace() {

const [marketPlaces,setMarketPlaces] = useState(marketplacesJSON);

    function categoryControl(isCategoryBasedPricing) {
        if (isCategoryBasedPricing){
            return "Evet"
        }else {
            return "Hayır"
        }
    }

    return(
        <Container>
            <Grid container spacing={-5}>
                {
                    marketPlaces.map(marketPlace => (

                        <Card sx={{ maxWidth: 345 }} >
                            <CardHeader title={
                                <Typography variant={"h5"}>{marketPlace.platformName}</Typography>
                            }  action={
                                <IconButton aria-label={"settings"}>
                                   <SettingsIcon></SettingsIcon>
                                </IconButton>}
                            />
                            <CardContent>
                                {
                                    marketPlace.commissionAmounts.map(commission =>
                                        (
                                            <Grid>
                                                <Grid item xs={14}>
                                                    <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Komisyon</Typography>
                                                    <Divider/>
                                                    <div style={{display:'flex'}}>
                                                                    <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Tutar:</Typography>
                                                                    <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{commission.amount} TL</Typography>
                                                                </div>


                                                            <div style={{display:'flex'}} >
                                                                <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Kategori Bazlı:</Typography>
                                                                <Typography variant={"body2"} color="darkred" sx={{ typography: 'subtitle2', fontFamily: 'Monospace' ,padding:'0 -10px'}} >{categoryControl(commission.isCategoryBasedPricing)}</Typography>

                                                            </div>



                                                </Grid>

                                            </Grid>
                                        )
                                    )
                                }
                            </CardContent>
                            <CardContent>
                                {

                                  marketPlace.shipmentAmounts.map(shipment=>(

                                      <Grid>
                                          <Grid item xs={14}>
                                              <Typography variant={"body2"} color="black" sx= {{  fontFamily: 'Monospace' ,padding:'0 -10px' ,margin:'0px 10px 0px 20px'}}>Kargo</Typography>
                                              <Divider/>
                                              <div style={{display:'flex'}}>
                                                  <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' ,padding:'0 20px'}}>Tutar:</Typography>
                                                  <Typography variant={"body2"} color="darkred" sx= {{ typography: 'subtitle2' , fontFamily: 'Monospace' }}>{shipment.amount} TL</Typography>
                                              </div>
                                          </Grid>
                                      </Grid>
                                  ))


                                }
                            </CardContent>
                        </Card>
                ))
                }
            </Grid>
        </Container>
    );
}
export default MarketPlace;