import {AppBar, Button, Dialog, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";

export default function MarketPlaceEdit(props){
const commissionTableColumns= [
    {field:'percent',headerName:'Komisyon Oranı(%)',editable:true ,width:500},
    {field:'category',headerName:'Komisyon Kategorisi',editable:true ,width:500},
    {field:'isCategoryBasedPricing',headerName:'Kategori Bazlı mı',editable:true ,width:500}
]
const commissionTableRows = props.marketPlace.commissionAmounts.map((commission,index)=>{
        const newComm = {...commission};
        newComm.id = index;
       // newComm.category = commission.categoryInfos[0].categoryName;
        newComm.percent = commission.percent
        newComm.isCategoryBasedPricing = commission.isCategoryBasedPricing ? 'Evet' : 'Hayır'
        //delete commission.categoryInfos;
        return newComm;
    })

const shipmentTableColumns = [
    {field:'amount',headerName:'Tutar(TL)',editable:true ,width:500},
    {field:'upperBound',headerName:'Barem Üst Sınır',editable:true ,width:500},
    {field:'isVolumeBasedPricing',headerName:'Desi Bazlı mı',editable:true ,width:500}
]
const shipmentTableRows = props.marketPlace.shipmentAmounts.map((shipment,index)=>{
    const newShipment = {...shipment.shipmentInfo}
    newShipment.id = index;
    if (newShipment.isVolumeBasedPricing){
        newShipment.upperBound = newShipment.volumeInfo.upperBound;
    } else {
        newShipment.upperBound = newShipment.scaleInfo.upperBound;
    }
    newShipment.isVolumeBasedPricing = newShipment.isVolumeBasedPricing ? 'Evet':'Hayır'
    delete newShipment.scaleInfo;
    delete newShipment.volumeInfo;
    return newShipment;
})


const cellEditCommitShipment = (e) =>{
    const shipmentToBeUpdated =  {...props.marketPlace.shipmentAmounts[e.id]};
    //shipmentToBeUpdated.shipmentInfo
    console.log('edit')
    console.log(e)
}

    return (

        <Dialog fullScreen open={props.open}>

            <AppBar sx={{position:'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={()=>props.setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon></CloseIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {props.marketPlace.platformName+' Bilgi Güncelleme'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <br/>
            <div className={'content'} >

                <div style={{display:"flex",justifyContent:"center"}} className={"platform-name"}>
                    <TextField label={props.marketPlace.platformName} disabled title={"Platform İsmi"}/>
                </div>
                <br/>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Komisyon Bilgileri
                </Typography>
                <div style={{ height: 400, width: '100%' }} className={'commission-table'}>
                        <DataGrid
                            autoPageSize
                            sortingMode={"server"}
                            pageSize={5}
                            columns={commissionTableColumns}
                            rows={commissionTableRows}
                            checkboxSelection
                        >

                        </DataGrid>
                </div >
                <br/>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                   Kargo Bilgileri
                </Typography>
                <div style={{ height: 400, width: '100%' }} className={'shipment-table'}>
                    <DataGrid
                        autoPageSize
                        sortingMode={"server"}
                        pageSize={5}
                        columns={shipmentTableColumns}
                        rows={shipmentTableRows}
                        checkboxSelection
                        onCellEditCommit={cellEditCommitShipment}
                    >

                    </DataGrid>
                </div>

            </div>
            <Button sx={{marginTop:5,width:'50vw',left:600}} color={'primary'}  size={"large"} variant={"contained"}>
                Güncelle
            </Button>

        </Dialog>
    );
}