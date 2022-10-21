import { useState } from "react";
import Table from "../../components/Table";
import { Modal, ModalFooter } from "react-bootstrap";
import { ENDPOINT } from "../../constants/endpointConstants";
import axios from "axios";
import { useEffect } from "react";

const InventoryPage = () => {
    const[newProduct, setNewProduct] = useState(false);
    const[items, setItems] = useState([]);
    const[nameProduct, setNameProduct] = useState('');
    const[amount, setAmount] = useState(0);
    const[purchasePrice, setPurchasePrice] = useState(0);
    const[loading, setLoading] = useState(false);
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
        const token = localStorage.getItem("userToken");
        const extraOptions = {
            headers: {
                authorization: `Bearer ${token}` 
            }
        }
        setLoading(true)
        try {
            const submitProduct = await axios.post(ENDPOINT.POST_NEW_PRODUCT,addProduct,extraOptions)
            setLoading(false)
            let newItems = items;
            newItems.push(submitProduct.data)
            setItems(newItems.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0)))
            modalClose();
        } catch (error) {
            setLoading(false)
        }
    } 

    const nameChange = (event) => {
        setNameProduct(event.target.value)
    }

    const amountChange = (event) => {
        setAmount(parseInt(event.target.value))
    }

    const purchasePriceChange = (event) => {
        setPurchasePrice(parseInt(event.target.value))
    }

    const salePriceChange = (event) => {
        setSalePrice(parseInt(event.target.value))
    }

    const showModal = () => {
        setNewProduct(true)
    }
    
    const modalClose = () => {
        setNewProduct(false)
    }

    const buttonContent = () => {
        if(loading === false){
            return "AGREGAR";
        } else {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
    }

    const isButtonDisabled = () => {
        if(nameProduct === "" || amount === 0 || purchasePrice === 0 || salePrice === 0){
            return true
        } else {
            return false
        }
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
                <button type="button" className="btn btn-primary btn-sm mt-5" data-bs-target="#modal" onClick={showModal}> <i className="fa-solid fa-plus"></i> Agregar producto </button>
                <Table columnNames={inventoryColumns} items={items} />
            </div>
            <Modal show={newProduct} onHide={modalClose}>
                <Modal.Header closeButton className="style-modal-header ">
                    <Modal.Title className="text-modal"> AGREGAR PRODUCTO </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="col-form-label">Nombre Producto</label>
                            <input type="text" className="form-control" onChange={nameChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Cantidad</label>
                            <input type="number" className="form-control" id="amount" onChange={amountChange}/>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-md-6">
                            <label className="col-form-label">Precio de Compra</label>
                            <input type="number" className="form-control" id="purchase-price" onChange={purchasePriceChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Precio de Venta</label>
                            <input type="number" className="form-control" id="sale-price" onChange={salePriceChange}/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-4">
                            <button type="button" className="btn btn-primary btn-sm w-100 text-modal" onClick={addNewProduct} disabled={isButtonDisabled()}> {buttonContent()}</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default InventoryPage;