import {useState} from "react";
import "./Login.css"
import {loginServiceObject} from "../../services/LoginService";
import AppAlert from "../AppAlert";
import AppBackDrop from "../AppBackDrop";
export default function Login(){


    const [currentViewMode,setCurrentViewMode] = useState("logIn");
    const [loginRequest,setLoginRequest] = useState({
        userName:null,
        userPassword:null
    })
    const [loginAlert,setAlert] = useState({show:false,message:null})
    const [showLoading,setShowLoading] = useState(false)
    const   changeView = (view) => {setCurrentViewMode(view)}

    function onSuccessLogin(res) {
        console.log('login comp successful api call')
        setShowLoading(false)
    }
    function onFailLogin(res) {
        console.log('login comp failed api call')
        setShowLoading(false)
        setAlert({show: true,message: res.message})
    }

    function loginHandler(e) {
        e.preventDefault()
        console.log(loginRequest)
        if (loginRequest.userName != null && loginRequest.userPassword != null) {
                setShowLoading(true)
                loginServiceObject.loginService(loginRequest.userName, loginRequest.userPassword, onSuccessLogin, onFailLogin);
        }
        else
            setAlert({show: true,message: 'Lütfen tüm alanları girdiğinizden emin olunuz.'})
    }
    function onChangeField(e,valueFrom) {
        if (e.target.value === '')
            setLoginRequest({...loginRequest, [valueFrom]: null})
        else
            setLoginRequest({...loginRequest, [valueFrom]: e.target.value})
    }
    const     currentView = () => {
            switch(currentViewMode) {
                case "signUp":
                    return (
                        <form>
                            <h2>Kayıt Ol!</h2>
                            <fieldset>
                                <legend>Kullanıcı Oluştur</legend>
                                <ul>
                                    <li>
                                        <label for="username">Kullanıcı:</label>
                                        <input type="text" id="username" required/>
                                    </li>
                                    <li>
                                        <label for="email">Email:</label>
                                        <input type="email" id="email" required/>
                                    </li>
                                    <li>
                                        <label for="password">Şifre:</label>
                                        <input type="password" id="password" required/>
                                    </li>
                                </ul>
                            </fieldset>
                            <button>Kaydet</button>
                            <button type="button" onClick={ () => changeView("logIn")}>Zaten Kayıtlı mısın?</button>
                        </form>
                    )
                    break
                case "logIn":
                    return (
                        <form>
                            <h2>ETPro'ya Hoşgeldin!</h2>
                            <fieldset>
                                <legend>Giriş Yap</legend>
                                <ul>
                                    <li>
                                        <label  for="username">Kullanıcı Adı:</label>
                                        <input  onChange={e=>onChangeField(e,"userName")} type="text" id="username" required/>
                                    </li>
                                    <li>
                                        <label for="password">Şifre:</label>
                                        <input onChange={e=>onChangeField(e,"userPassword")} type="password" id="password" required/>
                                    </li>
                                    <li>
                                        <i/>
                                        <a onClick={ () => changeView("PWReset")} href="">Şifreni mi unuttun?</a>
                                    </li>
                                </ul>
                            </fieldset>
                            <button onClick={loginHandler}>Giriş Yap</button>
                            <button type="button" onClick={ () => changeView("signUp")}>Kullanıcı oluştur</button>
                        </form>
                    )
                    break
                case "PWReset":
                    return (
                        <form>
                            <h2>Reset Password</h2>
                            <fieldset>
                                <legend>Password Reset</legend>
                                <ul>
                                    <li>
                                        <em>Sfırlama epostası sana iletilecek!</em>
                                    </li>
                                    <li>
                                        <label for="email">Email:</label>
                                        <input type="email" id="email" required/>
                                    </li>
                                </ul>
                            </fieldset>
                            <button>Yolla</button>
                            <button type="button" onClick={ () => changeView("logIn")}>Geri</button>
                        </form>
                    )
                default:
                    break
            }
        }


    console.log(`user ${loginRequest.userName} and pass ${loginRequest.userPassword}`)
            return (

                <div className={"login-top"}>
                    <AppBackDrop show = {showLoading} />
                    <AppAlert error = {true} message={loginAlert.message} show = {loginAlert.show} setAlert={setAlert} />
                    <div>
                        <section id="entry-page">
                                {currentView()}
                        </section>
                    </div>
                </div>
            )


}