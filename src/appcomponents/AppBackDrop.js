import {Backdrop, CircularProgress} from "@mui/material";

export default function AppBackDrop(props){

    return (
        <div className={"backdrop"}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.show}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
    );

}