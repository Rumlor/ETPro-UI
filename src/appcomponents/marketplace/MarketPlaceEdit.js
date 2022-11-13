import {AppBar, Button, Dialog, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {useReducer} from "react";
import {PUT_MARKETPLACE} from "../../api/MarketplaceApi";

export default function MarketPlaceEdit(props){

function initialValueSupplier() {
    //deep copied marketplace
    const copiedMarketPlace = {...props.marketPlace}
    copiedMarketPlace.commissionAmounts = [...copiedMarketPlace.commissionAmounts]
    copiedMarketPlace.shipmentAmounts = [...copiedMarketPlace.shipmentAmounts]
    return copiedMarketPlace;
}
const [marketPlace,setMarketPlace] = useReducer(reducer,null,initialValueSupplier);
const commissionTableColumns= [
{field:'percent',headerName:'Komisyon Oranı(%)',editable:true ,width:500},
{field:'category',headerName:'Komisyon Kategorisi',editable:true ,width:500},
{field:'isCategoryBasedPricing',headerName:'Kategori Bazlı mı',editable:true ,width:500}
]
const commissionTableRows = marketPlace.commissionAmounts.map((commission,index)=>{
    const newComm = {...commission};
    newComm.id = index;
   newComm.category = commission.categoryInfos != null && commission.categoryInfos.length >0 ? commission.categoryInfos[0].categoryName: null;
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
const shipmentTableRows = marketPlace.shipmentAmounts.map((shipment,index)=>{
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


function reducer(state,action) {
    switch (action.type){
        case 'percentEdited':
                const updated =  {...state.commissionAmounts[action.commissionIndex]};
                state.commissionAmounts.splice(action.commissionIndex,1)
                updated.percent = parseFloat(action.changeToValue);
                state.commissionAmounts.push(updated)
                return {...state};
        case 'categoryEdited':
            const updatedCategory =  {...state.commissionAmounts[action.commissionIndex]};
            updatedCategory.categoryInfos = [...updatedCategory.categoryInfos]
            updatedCategory.categoryInfos[0] = {...updatedCategory.categoryInfos[0]}
            state.commissionAmounts.splice(action.commissionIndex,1)
            updatedCategory.categoryInfos[0].categoryName = action.changeToValue
            state.commissionAmounts.push(updatedCategory)
            return {...state}
        case 'reset':
                console.log('resetting')
                return  {...initialValueSupplier()};
    }
}
const cellEditCommitShipment = (e) =>{
    const shipmentToBeUpdated =  {...props.marketPlace.shipmentAmounts[e.id]};
    //shipmentToBeUpdated.shipmentInfo
    console.log('edit')
    console.log(e)
}
const callEditCommitCommission = (e) =>{
    console.log('edit commission')
    console.log(e)
    let operationType = null;
                if (e.field==='percent'){
                    operationType = 'percentEdited'
                }
                else if (e.field === 'category'){
                    operationType = 'categoryEdited'
                }
                else if (e.field === 'isCategoryBasedPricing') {
                    operationType ='categoryFlagEdited'
                }
    const changeToValue = e.value
    const indexOfChangedCommission = e.id
    setMarketPlace( {type:operationType, changeToValue:changeToValue, commissionIndex:indexOfChangedCommission } );
}
    console.log('UPDATED!!')
    console.log(marketPlace)
    function onSuccess(res) {

    }

    function onFail(res) {

    }

    function transformMarketPlace(marketPlace) {
        marketPlace.shipmentAmounts.forEach(value => delete value.thresholdInfo);
        const transformed = marketPlace.shipmentAmounts.map(value => value.shipmentInfo);
        marketPlace.shipmentAmounts = [...transformed]
        return marketPlace;
    }

    function putMarketPlace(){
    const body = transformMarketPlace(marketPlace)
        console.log('putting')
        console.log(body)
    PUT_MARKETPLACE(marketPlace,onSuccess,onFail);

}

    return (

        <Dialog fullScreen open={props.open}>

            <AppBar sx={{position:'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={()=>{
                            props.setOpen(false);
                            setMarketPlace({type:'reset'})
                        }}
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
                            onCellEditCommit={callEditCommitCommission}
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
            <Button sx={{marginTop:5,width:'50vw',left:600}} onClick={()=>putMarketPlace()} color={'primary'}  size={"large"} variant={"contained"}>
                Güncelle
            </Button>

        </Dialog>
    );
}