import { useState } from "react";
import logo from "../../assets/Logo-pri-licores.png";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {ENDPOINT} from "../../constants/endpointConstants"
import { Modal } from "react-bootstrap";


const LoginPage = ({bringUser}) => {
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[loginError, setLoginError] = useState(false);
    const[loading, setLoading] = useState(false);

    const navigate = useNavigate ();

    const userLogin = async () => {
        let addUser ={
            userId:user,
            password: password,
        }
        setLoading(true); 
        try{
            const submitUser = await axios.post(ENDPOINT.POST_LOGIN,addUser); 
            setLoading(false)
            localStorage.setItem("userToken",submitUser.data.token)
            bringUser(submitUser.data.name)
            navigate("caja")
        } catch(error){
            setLoginError(true)
            setLoading(false)
        }
    } 

    const userChange = (event) => {
        setUser(event.target.value);
    }

    const userPassword = (event) => {
        setPassword(event.target.value);
    }

    const closeModal = () => {
        setLoginError(false)
    }

    const buttonContent = () => {
        if(loading === false){
            return "Ingresar";
        } else {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
    }

    const isButtonDisabled = () => {
        if(user === "" || password === ""){
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className='login col-10 col-md-4'>
                    <img src={logo}/>
                    <div className="row justify-content-center">
                        <div className=" col-8 mb-3">
                            <input type="text" placeholder="Usuario" className="form-control" onChange={userChange}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8 mb-3">
                            <input type="password" placeholder="Contraseña" className="form-control" onChange={userPassword}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary btn-sm loader" onClick={userLogin} disabled={isButtonDisabled()}>
                            {buttonContent()}
                        </button>
                    </div>
                </div> 
            </div>
            <Modal show={loginError} onHide={closeModal}>
                <Modal.Header closeButton className="style-modal-header">
                    <Modal.Title >Error de ingreso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Usuario o contraseña no encontrados</Modal.Body>
            </Modal>
            
        </div>
        
        )
}

export default LoginPage;