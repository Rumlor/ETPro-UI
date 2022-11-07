import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
     Checkbox,
  FormControlLabel, TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import SaveIcon from "@mui/icons-material/Save";

function CommissionInfoAccordion(props){
    const setMarketPlace = props.setMarketPlace;
    const index = props.index;

    const  initialCommission = {
        index:props.index,
        percent:null,
        isCategoryBasedPricing:false,
        categoryInfos:{
            categoryName:null
        }
    };
    const [isSaveEvent,setIsSaveEvent] = useState(false)
    const [commissionExpanded,setCommissionExpanded] = useState(false)
    const [categoryChecked,setCategoryChecked] = useState(false)
    const [commissionInfo,setCommissionInfo] = useState(initialCommission)
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
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
    function saveEvent() {

        setIsSaveEvent(false)
        if(props.marketPlace.commissionAmounts.findIndex(x=>x.index === props.index) === -1){
            console.log('saving commission')
            const newArray = [...props.marketPlace.commissionAmounts]
            newArray.push(commissionInfo)
            props.setMarketPlace({...props.marketPlace,commissionAmounts:newArray})
            setIsSaveEvent(true)
        } else {
            console.log('updating commission')
            const newArray = [...props.marketPlace.commissionAmounts]
            const updatedElement = {...props.marketPlace.commissionAmounts[props.index]}

            updatedElement.percent = commissionInfo.percent
            updatedElement.categoryInfos = commissionInfo.categoryInfos
            updatedElement.isCategoryBasedPricing = commissionInfo.isCategoryBasedPricing

            newArray[props.index] = updatedElement
            props.setMarketPlace({...props.marketPlace,commissionAmounts:newArray})

        }
        setShowSuccessMessage(true)
    }
    function deleteEvent() {
        const newArray = [...props.indexArray]
            if (newArray.findIndex(element=>element === index) === -1){
                newArray.push(index)
                props.setIndexArray(newArray)
        }
       //delete commission from marketplace also
        //if commission not added to marketplace yet
        if(props.marketPlace.commissionAmounts.findIndex(x=>x.index === props.index) === -1){
            // do nothing
        } else {
            let newArray = [...props.marketPlace.commissionAmounts]
            newArray = newArray.filter(x=>x.index !== index)
            props.setMarketPlace({...props.marketPlace,commissionAmounts:newArray})
        }
    }
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
                <>
                    {
                        showSuccessMessage? <Alert  severity="success">{'Komisyon '+  (isSaveEvent? 'kaydedildi':'güncellendi')}</Alert>
                            :<></>
                    }

                </>
                <SaveIcon onClick={saveEvent}/>
                <DeleteIcon onClick={deleteEvent} sx={{marginLeft:'25px'}}/>
                <div className={"commission-form"} style={{display:"flex"}}>
                    <TextField
                        name={'percent'}
                        label="Yüzde Komisyon"
                        onChange={setCommissionPercent}
                    />
                    <FormControlLabel sx={{marginLeft:'50px'}} control={<Checkbox/>} onClick={addCategoryInfos} checked={categoryChecked} label="Kategori Bazlı" />
                </div>
                    <div className={"commission-form-category"} style={categoryChecked?{visibility:'visible'}:{visibility:'hidden'}}>

                        <TextField
                            name={'categoryName'}
                            onChange={setCategoryName}
                            label="Kategori"
                        />


                </div>

            </AccordionDetails>
        </Accordion>
        </div>
    );
}
export default CommissionInfoAccordion;
