import {useState} from "react";
import {Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Inventory, Logout, Person, Store} from "@mui/icons-material";
import {Add, Home, Settings, ViewList} from "@material-ui/icons";
import "./AppDrawer.css"
import {useNavigate} from "react-router-dom";
import {loginServiceObject} from "../../../services/LoginService";



export default function AppDrawer(props){
    const [toggleDrawer,setToggleDrawer] = useState(false);
    const [toggleClass,setToggleClass] = useState('small')
    const  navigator = useNavigate();
    const getClick = () => {
        console.log('on get click')
        if(props.item.title!=='Ana Sayfa'){
            setToggleDrawer(true);
        }
        else{
            navigator('/')
            window.location.reload()
        }
    }
    function getSubClick(url) {
        console.log('on get sub click')
        if(url !== '/logout'){
            navigator(url)
        }
        else {
            loginServiceObject.logoutService();
            navigator("/login");
        }
        //window.location.reload();
    }
    function chooseIcon(title) {
        switch (title){
            case 'Pazar Yerleri':
                return (
                    <Store onMouseEnter={()=>setToggleClass('large')} onMouseLeave={()=>setToggleClass('small')} className={toggleClass}  fontSize={'large'}/>
                )
            case 'Ürünler':
                return (<Inventory onMouseEnter={()=>setToggleClass('large')} onMouseLeave={()=>setToggleClass('small')} className={toggleClass} fontSize={'large'}/>)
            case 'Ana Sayfa':
                return (<Home onMouseEnter={()=>setToggleClass('large')} onMouseLeave={()=>setToggleClass('small')} className={toggleClass}  fontSize={'large'}/>)
            case 'Kullanıcı':
                return (<Person onMouseEnter={()=>setToggleClass('large')} onMouseLeave={()=>setToggleClass('small')} className={toggleClass} fontSize={'large'}/>)
        }
    }
    function chooseSubMenuIcon(element) {
        switch (element.title){
            case "Pazar Yeri Ekle":
                return (
                    <Add/>
                )
            case "Pazar Yeri Listele":
                return (<ViewList/>)
            case "Ürünler":
                return  (<Inventory/>)
            case "Çıkış Yap":
                return (<Logout/>)
            case "Kullanıcı Ayarları":
                return (<Settings/>)
        }
    }


    return (
        <div className={'drawer-list'}>
            <div onClick={getClick} style={{marginLeft:45}}>
                {
                    chooseIcon(props.item.title)
                }
            </div>
            <div className={'drawer'}>
                {
                    props.item.title !== 'Ana Sayfa'?
                    <Drawer
                        anchor={'right'}
                        open={toggleDrawer}
                        onClose={()=>setToggleDrawer(false)}
                    >
                        <Box
                            sx={{width:250}}
                            role={'presentation'}
                            onClick={()=>setToggleDrawer(false)}>
                            <List>
                                {
                                    props.item.title !== 'Ana Sayfa'
                                        ?
                                        props.item.subMenus.map((element,index)=>{
                                            return(
                                                <ListItem key={index} disablePadding>
                                                    <ListItemButton onClick={()=>getSubClick(element.url)}>
                                                        <ListItemIcon>
                                                            {
                                                                chooseSubMenuIcon(element)
                                                            }
                                                        </ListItemIcon>
                                                        <ListItemText primary={element.title}/>
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })
                                        : <></>
                                }
                            </List>
                        </Box>
                    </Drawer>
                        :
                    <></>
                }
            </div>
        </div>
    );
}