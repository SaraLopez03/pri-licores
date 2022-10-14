import { useState } from "react";
import NavBar from "../../components/NavBar";
import Table from "../../components/Table";
import { Modal } from "react-bootstrap";
import { ENDPOINT } from "../../constants/endpointConstants";
import axios from "axios";
import { useEffect } from "react";

const InventoryPage = () => {
    const[newProduct, setNewProduct] = useState(true);
    const[products, setProducts] = useState([]);
    const[nameProduct, setNameProduct] = useState('');
    const[amount, setAmount] = useState(0);
    const[purchasePrice, setPurchasePrice] = useState(0);
    const[salePrice, setSalePrice] = useState(0);

    const bringInformation = async () => {
        const storeToken = localStorage.getItem("userToken");
        const apiOptions = {
            headers: {
                authorization: `Bearer ${storeToken}` 
            }
        }
        const bringProducts = await axios.get(ENDPOINT.GET_PRODUCTS, apiOptions);
        setProducts(bringProducts.data);
    }
    useEffect( () => {
        bringInformation();
    } ,[]) 

    const addNewProduct = async () => {
        let addProduct = {
            name: nameProduct,
            amount: amount,
            purchasePrice: purchasePrice,
            salePrice: salePrice,
        }
    } 

    const nameChange = (event) => {
        setNameProduct(event.target.value)
    }

    const amauntChange = (event) => {
        setAmount(event.target.value)
    }

    const purchasePriceChange = (event) => {
        setPurchasePrice(event.target.value)
    }

    const salePriceChange = (event) => {
        setSalePrice(event.target.value)
    }
    
    const inventoryColumns = [
        "Nombre Producto",
        "Cantidad",
        "Precio compra",
        "Precio venta",
        "Utilidad",
        "Acciones",
    ]


    return(
        <div>
            <NavBar/>
            <div className ="mx-4">
                <h1 className="style-title-page mt-4">Inventario</h1>
                <button type="button" className="btn btn-primary btn-sm mt-5" onClick={addNewProduct}> <i className="fa-solid fa-plus"></i> Agregar producto </button>
                <Table columnNames={inventoryColumns} products={products}/>
            </div>
            {/* <Modal show={newProduct}>
                <Modal.Header closeButton className="style-modal-header">
                    <Modal.Title >Error de ingreso</Modal.Title>
                </Modal.Header>
                <Modal.Body>Usuario o contraseña no encontrados</Modal.Body>
            </Modal> */}
        </div>
    )
}

export default InventoryPage;