import {AppBar, Dialog, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ThresholdListItem(props){
console.log('amount')
    console.log(props.thresholdInfo.thresholdAmount )


    return (
        props.selectedShipmentIndex === props.index?
           <Dialog fullScreen open={props.open}>

               <AppBar sx={{position:'relative'}}>
                   <Toolbar >
                       <IconButton
                           edge="start"
                           color="inherit"
                           onClick={()=>props.setOpen(false)}
                           aria-label="close"
                       >
                           <CloseIcon></CloseIcon>
                       </IconButton>
                       <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                           Sınır Değerler
                       </Typography>
                   </Toolbar>
               </AppBar>

               <div>
                   <List>
                       {
                           props.thresholdInfo.map((threshold,index)=>(
                               <div>
                                 <ListItem sx={{left:'50vw'}}>
                                           <ListItemText primary={threshold.category!=null?threshold.category.categoryName:'Genel'}>
                                           </ListItemText>
                                 </ListItem>
                                 <ListItem sx={{left:'50vw'}}>
                                           <ListItemText primary={threshold.thresholdAmount+ ' ₺'}>

                                           </ListItemText>
                                 </ListItem>

                                 <Divider />
                               </div>
                           ))
                       }
                   </List>
               </div>
           </Dialog>:<></>

   );
}