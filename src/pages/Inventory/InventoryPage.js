import { useState } from "react";
import Table from "../../components/Table";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { ENDPOINT } from "../../constants/endpointConstants";
import axios from "axios";
import { useEffect } from "react";
import { getToken } from "../../utils/utils";

const InventoryPage = () => {
    const[newProduct, setNewProduct] = useState(false);
    const[deleteProducts, setDeleteProducts] = useState(false)
    const[items, setItems] = useState([]);
    const[nameProduct, setNameProduct] = useState('');
    const[amount, setAmount] = useState('');
    const[purchasePrice, setPurchasePrice] = useState('');
    const[loading, setLoading] = useState(false);
    const[salePrice, setSalePrice] = useState('');
    const[isUpdateModal, setIsUpdateModal] = useState(false);
    const[productId, setProductId] = useState('');



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
        const token = getToken()
        setLoading(true)
        try {
            const submitProduct = await axios.post(ENDPOINT.POST_NEW_PRODUCT,addProduct,token)
            setLoading(false)
            let newItems = items;
            newItems.push(submitProduct.data)
            setItems(newItems.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : 0)))
            modalClose();
            resetProductFormValues();
        } catch (error) {
            setLoading(false)
        }
    } 

    const updateProduct = async () => {
        let update = {
            name: nameProduct,
            amount: amount,
            purchasePrice: purchasePrice,
            salePrice: salePrice,
            productId: productId,
        }
        const token = getToken()
        setLoading(true)
        try {
            const submitUpdateProduct = await axios.put(ENDPOINT.PUT_UPDATE_PRODUCT,update,token)
            setLoading(false)
            const productIndex = items.findIndex( (item) => {
                return item.productId === productId
            })
            items[productIndex] = submitUpdateProduct.data
            setItems(items)
            modalClose();
            resetProductFormValues();
        } catch (error) {
            setLoading(false)
            
        }
    }

    const deleteProductModal = async () => {
        let putOffProduct = {
            productId: productId,
        }
        const token = getToken()
        token.data = putOffProduct
        setLoading(true)
        try {
            const submitDeleteProduct = await axios.delete(ENDPOINT.DEL_DELETE_PRODUCT,token)
            setLoading(false)
            const itemsUpdated = items.filter( (item) => {
                return item.productId !== productId
            })
            setItems(itemsUpdated)
            modalCloseDelete()
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

    const showModalDelete = () => {
        setDeleteProducts(true)
    }

    const showModal = () => {
        setNewProduct(true)
    }

    const modalCloseDelete = () => {
        setDeleteProducts(false)
    }
    
    const modalClose = () => {
        setNewProduct(false)
    }
    const spinnerDelete = () => {
        if(loading === false){
            return "SI";
        } else {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
    }

    const buttonContent = () => {
        if(loading === false){
            return UpdateModal();
        } else {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
    }

    const isButtonDisabled = () => {
        if(nameProduct === "" || isValidInputNumber(amount) || isValidInputNumber(purchasePrice) || isValidInputNumber(salePrice)){
            return true
        } else {
            return false
        }
    }

    const isValidInputNumber =  (value) => {
        return !value || isNaN(value);
    }

    const resetProductFormValues = () => {
        setNameProduct('');
        setAmount('');
        setSalePrice('');
        setPurchasePrice('');
    }    

    const editProduct = (product) => {
        setNameProduct(product.name)
        setAmount(product.amount)
        setPurchasePrice(product.purchasePrice)
        setSalePrice(product.salePrice)
        setProductId(product.productId)
        setIsUpdateModal(true)
        showModal()
    }

    const deleteProduct = (product) => {
        setProductId(product.productId)
        showModalDelete()
    }

    const UpdateModal = () => {
        if(isUpdateModal === true){
            return (
                "ACTUALIZAR"
            ) 
        } else {
            return (
                "AGREGAR"
            )
        }
    }

    const modalOnClick = () => {
        if(isUpdateModal === true){
            updateProduct()

        } else {
            addNewProduct()
        }
    }

    const showModalNewProduct = () => {
        resetProductFormValues()
        setIsUpdateModal(false)
        showModal()
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
            type: "actions",
            buttons: [
                {
                    iconClass: "fa-regular fa-pen-to-square",
                    action: editProduct 
                },
                {
                    iconClass: "fa-solid fa-trash-can",
                    action: deleteProduct
                }
            ]
        }

    ]


    return(
        <div>
            <div className ="mx-4">
                <h1 className="style-title-page mt-4">Inventario</h1>
                <button type="button" className="btn btn-primary btn-sm mt-5" data-bs-target="#modal" onClick={showModalNewProduct}> <i className="fa-solid fa-plus"></i> Agregar producto </button>
                <Table columnNames={inventoryColumns} items={items} />
            </div>
            <Modal show={newProduct} onHide={modalClose}>
                <Modal.Header closeButton className="style-modal-header">
                    <Modal.Title className="text-modal"> {UpdateModal()} PRODUCTO </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="col-form-label">Nombre Producto</label>
                            <input type="text" className="form-control" value={nameProduct} onChange={nameChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Cantidad</label>
                            <input type="number" className="form-control" id="amount" value={amount} onChange={amountChange}/>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-md-6">
                            <label className="col-form-label">Precio de Compra</label>
                            <input type="number" className="form-control" id="purchase-price" value={purchasePrice} onChange={purchasePriceChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Precio de Venta</label>
                            <input type="number" className="form-control" id="sale-price" value={salePrice} onChange={salePriceChange}/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-6 col-md-5">
                            <button type="button" className="btn btn-primary btn-sm w-100 text-modal" onClick={modalOnClick} disabled={isButtonDisabled()}> {buttonContent()}</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={deleteProducts} onHide={modalCloseDelete}>
                <Modal.Header closeButton className="style-modal-header ">
                    <Modal.Title className="text-modal"> ELIMINAR PRODUCTO </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <p className="text-center"> Estas seguro que deseas eliminar este producto? </p>
                    <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn btn-primary btn-sm w-100 text-modal mt-3" onClick={deleteProductModal}> {spinnerDelete()} </button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn btn-primary btn-sm w-100 text-modal mt-3" onClick={modalCloseDelete}> NO </button>
                            </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default InventoryPage;