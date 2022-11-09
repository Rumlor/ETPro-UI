

import {useEffect, useState} from "react";
import marketplacesJSON from "../data/marketplaces.json";
import {
    Button,
    ButtonGroup,
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

function MarketPlace() {

    //data is fed here.
const [marketPlaces,setMarketPlaces] = useState([]);

//api call
useEffect(
    ()=>{
    GET_MARKETPLACES(null,onApiSuccess,onApiFail)
},[]);

function onApiSuccess(response){
    console.log('response from /get')
    console.log(response)
    setMarketPlaces(response.object)
}
function onApiFail(response){
    console.log('fail response from /get')
    console.log(response)
}
    return(
        <div className={"marketlace-table"}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Pazar&nbsp;Yeri</Typography></TableCell>
                            <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Komisyon&nbsp;Bilgileri</Typography></TableCell>
                            <TableCell align={"center"}><Typography variant={"h5"} gutterBottom>Kargo&nbsp;Bilgileri</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            marketPlaces.map((marketPlace,index)=>
                                (
                                    <TableCollapsibleRow key = {index} marketPlace = {marketPlace}/>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default MarketPlace;