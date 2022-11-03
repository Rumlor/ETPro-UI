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
import CommissionInfo from "./CommissionInfo";
import {useRef, useState} from "react";

function CommissionInfoAccordion(props){
    const  initialCommission = {
        percent:null,
        isCategoryBasedPricing:false,
        categoryInfos:[{
            categoryName:''
        }]
    };
    const categoryTextBoxRef = useRef(null);
    const [commissionExpanded,setCommissionExpanded] = useState(false)
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [categoryChecked,setCategoryChecked] = useState(false)
    const [commissionInfo,setCommissionInfo] = useState(initialCommission)
    function deleteCommission() {
        const newArray =  props.commissionCounter.filter(i=>i !== props.index);
        console.log('new array size'+newArray.length);
        props.setCommissionCounter(newArray);
        setDeleteDialog(false);
    }

    function addCategoryInfos() {
        setCategoryChecked(!categoryChecked);

    }

    return(
        <>
        <Accordion expanded={commissionExpanded}   color={'red'} onChange={()=>{
            if (commissionExpanded)
                setCommissionExpanded(false)
            else
                setCommissionExpanded(true)
        }}>
            <AccordionSummary    expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                {

                      (props.index % 2) === 0 ?
                   <Typography  color={'red'} sx={{ width: '33%', flexShrink: 0 }}>
                        Komisyon
                    </Typography> :
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
                        onChange={e=>setCommissionInfo({...commissionInfo,[e.target.name]:e.target.value})}
                    />
                    <div className={"commission-form-category"} style={categoryChecked?{visibility:'visible'}:{visibility:'hidden'}}>

                        <TextField
                            inputRef={categoryTextBoxRef}
                            name={'categoryName'}
                            id="outlined-required"
                            label="Kategori"
                        />
                    </div>
                    <FormControlLabel sx={{marginLeft:'50px'}} control={<Checkbox/>} onClick={addCategoryInfos} checked={categoryChecked} label="Kategori Bazlı" />
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
        </>
    );
}
export default CommissionInfoAccordion;
