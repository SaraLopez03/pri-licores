import React from "react";
import logo from "../../assets/Logo-pri-licores.png";
import {useNavigate,useLocation, NavLink} from "react-router-dom";


const NavBar = ({name}) => {
    const navigate = useNavigate ();

    let location = useLocation();

    const logout = () => {
        localStorage.removeItem("userToken")
        navigate("")
    }

    const showNavBar = () => {
        if(location.pathname === "/"){
            return ""
        } else {
            return (
                <nav className="navbar navbar-expand-lg style-nav">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <img className="navbar-brand style-nav-logo" src= {logo}/>
                            <p className="style-name"> {name} </p>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">   
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className= "nav-link style-nav-link" to="/caja" >CAJA </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link style-nav-link" to="/inventario" >INVENTARIO </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link style-nav-link" to="/total-ventas" >TOTAL VENTAS </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link style-nav-link" to="/cierre-caja" >CIERRE CAJA </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link logout style-nav-link" >
                                        <i className="fa-solid fa-right-from-bracket" onClick={logout}></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
    }
      
    return showNavBar();
}

export default NavBar;