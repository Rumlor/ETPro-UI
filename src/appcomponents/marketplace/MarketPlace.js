

import {useEffect, useState} from "react";
import marketplacesJSON from "../data/marketplaces.json";
import "./MarketPlace.css"
import {
    Alert,
    Backdrop,
    Button,
    ButtonGroup, CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import TableCollapsibleRow from "./TableCollapsibleRow";
import {GET_MARKETPLACES} from "../../api/MarketplaceApi";
import {CSSTransition} from "react-transition-group";

function MarketPlace() {

    //data is fed here.
const [marketPlaces,setMarketPlaces] = useState([]);
const [updateFlag,setUpdateFlag] = useState(true)
const [showApiFail,setShowApiFail] = useState(false)
const [showApiSuccess,setShowApiSuccess] = useState(false)
    const [toggleTransition,setToggleTransition] = useState(false)
const [showLoadingScreen,setShowLoadingScreen] = useState(false)
//api call
useEffect(
    ()=>{

        if(updateFlag) {
            setShowLoadingScreen(true)
            GET_MARKETPLACES(null, onApiSuccess, onApiFail)
            setUpdateFlag(false)
        }

},[updateFlag]);

function onApiSuccess(response){
    console.log('response from /get')
    console.log(response)
    setMarketPlaces(response.object)
    //close loading screen
    setShowLoadingScreen(false)
    //close api fail flag
    setShowApiFail(false)
    //open api success  flag
    setShowApiSuccess(true)
    //open transition wrapper
    setToggleTransition(true)
}
function onApiFail(response){
    console.log('fail response from /get')
    console.log(response)
    //close loading screen
    setShowLoadingScreen(false)
    // close api success  flag
    setShowApiSuccess(false)
    // open api fail flag
    setShowApiFail(true)
    //open transition wrapper
    setToggleTransition(true)
}
    return(
        <div>
            <div className={"backdrop"}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={showLoadingScreen}
                    >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            <div className={"alert"}>
                <CSSTransition
                    in={toggleTransition}
                    timeout={1000}
                    classNames={"api-fail-or-success-transition"}
                    addEndListener={()=>setTimeout(()=>{setToggleTransition(false)},4000)}
                    unmountOnExit={true}
                >
                    <div style={{justifyContent:'center'}}>
                        {

                                <Alert icon={false}  sx={{display:'flex',justifyContent:'center'}}  color={showApiSuccess?'success':'error'} className={"alert-success"}>
                                    {
                                       <p>{ showApiSuccess?`Pazar yeri sayısı ${marketPlaces.length}.`:`Pazar yerleri getirilirken hatayla karşılaşıldı.`}</p>
                                    }
                                </Alert>


                        }
                    </div>
                </CSSTransition>
            </div>
                     <div className={"marketlace-table"}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Pazar&nbsp;Yeri</Typography></TableCell>
                                <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Komisyon&nbsp;Bilgileri</Typography></TableCell>
                                <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Kargo&nbsp;Bilgileri</Typography></TableCell>
                                <TableCell align={"right"}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                marketPlaces.map((marketPlace,index)=>
                                    (
                                        <TableCollapsibleRow updateFlag = {updateFlag} setUpdateFlag={setUpdateFlag}  showApiFail = {setShowApiFail} showApiSuccess={setShowApiSuccess} setLoadingScreen = {setShowLoadingScreen} key = {index} marketPlace = {marketPlace} />
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
            );
}
export default MarketPlace;