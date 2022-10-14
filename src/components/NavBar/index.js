import React from "react";
import logo from "../../assets/Logo-pri-licores.png";


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-faded style-nav">
            <img className="navbar-brand style-nav-logo" src= {logo}/>
            <div className="collapse navbar-collapse justify-content-end" id="nav-content">   
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link style-nav-link" href="#">CAJA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link style-nav-link" href="#">INVENTARIO</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link style-nav-link" href="#">TOTAL VENTAS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link style-nav-link" href="#">CIERRE CAJA</a>
                    </li>
                    <li className="nav-item dropdown">
                        {/* <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Menu</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#caja">Caja</a>
                            <a class="dropdown-item" href="#inventario">Inventario</a>
                            <a class="dropdown-item" href="#total">Total Ventas</a>
                            <a class="dropdown-item" href="#cierre">Cierre Caja</a>
                        </div> */}
                    </li>
                    <li className="nav-item">
                        <button className="nav-link logout" >
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </li>
                </ul>
              
            </div>
        </nav>
    )
}

export default NavBar;