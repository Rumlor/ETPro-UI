import * as React from 'react';
import {
    Box,
    Button,
    Collapse, 
    IconButton, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from '@mui/icons-material/List';
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import ThresholdListItem from '../thresholdList/ThresholdListItem'
import MarketPlaceEdit from "./MarketPlaceEdit";
import { apiDelegateService } from '../../api/ApiDelegateService';
export default function TableCollapsibleRow(props) {
    const {deleteMarketPlace} = apiDelegateService.marketPlaceApi
    const [open, setOpen] = React.useState(false);
    const [openThresholdList,setOpenThresholdList] = useState(false)
    const [showUpdateMarketPlace,setShowUpdateMarketPlace] = useState(false)
    const [shipmentIndexForThreshold,setShipmentIndexForThreshold] = useState(null)
    function deleteAction() {
        console.log('platform name to be deleted '+props.marketPlace.platformName)
        deleteMarketPlace([props.marketPlace.platformName],{success:onSuccessApi,fail:onFailApi});
        props.setLoadingScreen(true)
    }
    function onSuccessApi(response) {
        props.setUpdateFlag(true)
        props.setLoadingScreen(false)
        props.showApiSuccess(true)
    }
    function onFailApi(response){
        props.setLoadingScreen(false)
        props.showApiFail(true)
    }
    function checkBounds(boundInfo) {
        if (boundInfo == null)
            return ''

        let resultString = ''
        if (boundInfo.lowerBound != null){
            resultString += boundInfo.lowerBound+' - ';
        }
        if ( boundInfo.upperBound != null) {
            resultString+=boundInfo.upperBound;
        } else {
            resultString+='sonsuz';
        }

        return  resultString;
    }
    function editAction() {
        setShowUpdateMarketPlace(true)
    }

    return (
      <React.Fragment>
          <MarketPlaceEdit marketPlace = {props.marketPlace} open = {showUpdateMarketPlace} setOpen={setShowUpdateMarketPlace} setUpdateFlag = {props.setUpdateFlag}/>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={()=>setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
              <TableCell component="th" scope="row" align={"center"}>
                  {props.marketPlace.platformName}
              </TableCell>
              <TableCell align={"center"}>{props.marketPlace.commissionAmounts.length+' Komisyon Bilgisi'}</TableCell>
              <TableCell align={"center"}>{props.marketPlace.shipmentAmounts.length+' Kargo Bilgisi'}</TableCell>
              <TableCell align={"right"}>
                  <Button startIcon={<DeleteIcon/>} onClick={deleteAction}>
                      Sil
                  </Button>
                  <Button startIcon={<EditIcon/>} onClick={editAction}>
                      Güncelle
                  </Button>
              </TableCell>
          </TableRow>
          <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                              Komisyon
                              <Table size="small" aria-label="commissions">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Yüzde(%)</TableCell>
                                            <TableCell>Kategori Bazlı</TableCell>
                                            <TableCell>Kategori</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.marketPlace.commissionAmounts.map((commission,index)=>
                                                (
                                                    <TableRow key={index}>
                                                        <TableCell>{'%'+commission.percent}</TableCell>
                                                        <TableCell >{commission.isCategoryBasedPricing?<CheckIcon sx={{paddingLeft:'35px'}} />:<RemoveSharpIcon sx={{paddingLeft:'35px'}}/>}</TableCell>
                                                        <TableCell>{commission.categoryInfos != null ?commission.categoryInfos.map(category=>category.categoryName).join():''}</TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        }
                                    </TableBody>
                              </Table>
                          </Typography>

                      </Box>
                  </Collapse>
              </TableCell>
          </TableRow>
          <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                              Kargo
                              <Table size="small" aria-label="commissions">
                                  <TableHead>
                                      <TableRow>
                                          <TableCell>Tutar(TL)</TableCell>
                                          <TableCell>Desi&nbsp;Bazlı</TableCell>
                                          <TableCell>Barem&nbsp;Bazlı</TableCell>
                                          <TableCell>Desi&nbsp;Aralığı</TableCell>
                                          <TableCell>Barem&nbsp;Aralığı</TableCell>
                                          <TableCell align={'right'}>Sınır&nbsp;Değerleri</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {
                                          props.marketPlace.shipmentAmounts.map((shipment,index)=>
                                              (
                                                  <TableRow key={index}>
                                                      <TableCell>{shipment.shipmentInfo.amount+'TL'}</TableCell>
                                                      <TableCell >{shipment.shipmentInfo.isVolumeBasedPricing?<CheckIcon sx={{paddingLeft:'35px'}} />:<RemoveSharpIcon sx={{paddingLeft:'35px'}}/>}</TableCell>
                                                      <TableCell >{!shipment.shipmentInfo.isVolumeBasedPricing?<CheckIcon sx={{paddingLeft:'35px'}} />:<RemoveSharpIcon sx={{paddingLeft:'35px'}}/>}</TableCell>
                                                      <TableCell sx={{paddingLeft:'35px'}}> {checkBounds(shipment.shipmentInfo.volumeInfo)} </TableCell>
                                                      <TableCell sx={{paddingLeft:'35px'}}> {checkBounds(shipment.shipmentInfo.scaleInfo)} </TableCell>
                                                      <TableCell align={'right'} sx={{paddingLeft:'35px'}}>
                                                          <Button
                                                              onClick={()=>{setShipmentIndexForThreshold(index);setOpenThresholdList(true)}}
                                                              startIcon={<ListIcon/>}>
                                                              Listele
                                                          </Button>
                                                          <div className={'threshold-info-dialog'}>
                                                              <ThresholdListItem thresholdInfo = {shipment.thresholdInfo} open={openThresholdList} setOpen={setOpenThresholdList}  index={index} selectedShipmentIndex = {shipmentIndexForThreshold}/>
                                                          </div>

                                                      </TableCell>
                                                  </TableRow>
                                              )
                                          )
                                      }
                                  </TableBody>
                              </Table>
                          </Typography>

                      </Box>
                  </Collapse>
              </TableCell>
          </TableRow>
      </React.Fragment>
    );
}