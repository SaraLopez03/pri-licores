import { useState } from "react";
import Table from "../../components/Table";
import { Modal } from "react-bootstrap";
import { ENDPOINT } from "../../constants/endpointConstants";
import axios from "axios";
import { useEffect } from "react";

const InventoryPage = () => {
    const[newProduct, setNewProduct] = useState(true);
    const[items, setItems] = useState([]);
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
        setItems(bringProducts.data);
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
        {
            name: "Nombre Producto",
            key: "name",
            type: "text"
        },
        {
            name: "Cantidad",
            key: "amount",
            type: "number"
        },
        {
            name: "Precio compra",
            key: "purchasePrice",
            type: "currency"
        },
        {
            name: "Precio venta",
            key: "salePrice",
            type: "currency"
        },
        {
            name: "Utilidad",
            key: "profit",
            type: "currency"
        },
        {
            name: "Acciones",
            key:"action",
            type: "actions"
        }

    ]


    return(
        <div>
            <div className ="mx-4">
                <h1 className="style-title-page mt-4">Inventario</h1>
                <button type="button" className="btn btn-primary btn-sm mt-5" onClick={addNewProduct}> <i className="fa-solid fa-plus"></i> Agregar producto </button>
                <Table columnNames={inventoryColumns} items={items} />
            </div>
        </div>
    )
}

export default InventoryPage;