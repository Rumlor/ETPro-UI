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
import {DELETE_MARKETPLACE} from "../../api/MarketplaceApi";


export default function TableCollapsibleRow(props) {
    const [open, setOpen] = React.useState(false);

    function deleteAction() {
        console.log('platform name to be deleted '+props.marketPlace.platformName)
        DELETE_MARKETPLACE(props.marketPlace.platformName,onSuccessApi,onFailApi);
        props.setUpdateFlag(true)
        props.setLoadingScreen(true)
    }

    function onSuccessApi(response) {
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

    return (
      <React.Fragment>
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
                  <Button startIcon={<CheckIcon></CheckIcon>}>
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
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {
                                          props.marketPlace.shipmentAmounts.map((shipment,index)=>
                                              (
                                                  <TableRow key={index}>
                                                      <TableCell>{shipment.amount+'TL'}</TableCell>
                                                      <TableCell >{shipment.isVolumeBasedPricing?<CheckIcon sx={{paddingLeft:'35px'}} />:<RemoveSharpIcon sx={{paddingLeft:'35px'}}/>}</TableCell>
                                                      <TableCell >{!shipment.isVolumeBasedPricing?<CheckIcon sx={{paddingLeft:'35px'}} />:<RemoveSharpIcon sx={{paddingLeft:'35px'}}/>}</TableCell>
                                                      <TableCell sx={{paddingLeft:'35px'}}> {checkBounds(shipment.volumeInfo)} </TableCell>
                                                      <TableCell sx={{paddingLeft:'35px'}}> {checkBounds(shipment.scaleInfo)} </TableCell>
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