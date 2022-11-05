import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Checkbox,
    Dialog, DialogActions, DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel, TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";

function CommissionInfoAccordion(props){
    const setMarketPlace = props.setMarketPlace;
    const index = props.index;

    const  initialCommission = {
        percent:null,
        isCategoryBasedPricing:false,
        categoryInfos:{
            categoryName:null
        }
    };
    const [commissionExpanded,setCommissionExpanded] = useState(false)
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [categoryChecked,setCategoryChecked] = useState(false)
    const [commissionInfo,setCommissionInfo] = useState(initialCommission)
    function deleteCommission() {
        //implement
        setDeleteDialog(false);
    }
    function updateMarketPlace() {
        props.marketPlace.commissionAmounts[index] = commissionInfo;
        props.setMarketPlace(props.marketPlace);
    }
    function addCategoryInfos() {
        if (!categoryChecked){
            console.log('set category based to true')
            setCommissionInfo({...commissionInfo,isCategoryBasedPricing:true});
        } else {
            setCommissionInfo({...commissionInfo,isCategoryBasedPricing:false});
            console.log('set category based to false')
        }
        setCategoryChecked(!categoryChecked);
    }
    function setCategoryName(e) {
        setCommissionInfo({...commissionInfo,'categoryInfos':{...commissionInfo.categoryInfos,[e.target.name]:e.target.value}});
    }
    function setCommissionPercent(e) {
        setCommissionInfo({...commissionInfo,[e.target.name]:e.target.value});
    }
    updateMarketPlace();
    console.log('category selected?'+categoryChecked);
    console.log(commissionInfo);



    return(
        <div style={{width:'50vw'}}>
        <Accordion expanded={commissionExpanded}   color={'red'} onChange={()=>{
            if (commissionExpanded)
                setCommissionExpanded(false)
            else
                setCommissionExpanded(true)
        }}>
            <AccordionSummary    expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                {

                   <Typography   sx={{ width: '33%', flexShrink: 0 }}>
                    Komisyon
                    </Typography>

                }

                <Typography sx={{ color: 'text.secondary' ,margin:'0px 0px 0px 10px'}}>Komisyon Bilgileri</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={"commission-form"} style={{display:"flex"}}>
                    <TextField
                        name={'percent'}
                        label="Yüzde Komisyon"
                        onChange={setCommissionPercent}
                    />
                    <div className={"commission-form-category"} style={categoryChecked?{visibility:'visible'}:{visibility:'hidden'}}>

                        <TextField
                            name={'categoryName'}
                            onChange={setCategoryName}
                            label="Kategori"
                        />
                    </div>
                    <FormControlLabel sx={{marginLeft:'50px'}} control={<Checkbox/>} onClick={addCategoryInfos} checked={categoryChecked} label="Kategori Bazlı" />
                    <DeleteIcon sx={{marginTop:3}}  onClick={()=>setDeleteDialog(true)}/>
                </div>

            </AccordionDetails>
        </Accordion>
        <Dialog open={deleteDialog} onClose={()=>setDeleteDialog(false)}>
            <DialogTitle id="alert-dialog-title">
                {"Girilen Komisyon Silinsin mi?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Girdiğiniz Komsiyon Silinecektir. Emin misiniz?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{deleteCommission()}}>Sil</Button>
                <Button onClick={()=>setDeleteDialog(false)} autoFocus>
                    Vazgeç
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
export default CommissionInfoAccordion;
