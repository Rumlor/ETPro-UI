import {CSSTransition} from "react-transition-group";
import {Alert} from "@mui/material";
import "./AppAlert.css"
export default function AppAlert(props){

    return (

        <div className={"alert"}>

            <CSSTransition
                in={props.show}
                timeout={{
                    "appear":500,
                    "exit":0
                }}
                classNames={"api-fail-or-success-transition"}
                addEndListener={()=>setTimeout(()=>{props.setAlert({show: false,message: null})},4000)}
                unmountOnExit={true}
            >
                <div style={{justifyContent:'center'}}>
                    {

                        <Alert variant={"filled"} severity={"error"} sx={{display:'flex',justifyContent:'center',height:50}}  color={props.error?'error':'success'} className={"alert-success"}>
                            {
                                <p>{props.message}</p>
                            }
                        </Alert>

                    }
                </div>
            </CSSTransition>
        </div>
    )
}