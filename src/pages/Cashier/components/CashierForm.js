import { useEffect, useState } from "react";
import { ENDPOINT } from "../../../constants/endpointConstants"
import axios from 'axios';
import { getToken } from "../../../utils/utils";
import ErrorModal from "../../../components/ErrorModal";

const CashierForm = ({buttonAction, saleToUpdate, productsToUpdate}) => {
    const defaultProducts = [
        {
            productId: '',
            productName: '',
            productPrice: 0,
            profit: 0,
            amount: '',
            total: 0
        }
    ]
    const [currentProducts, setCurrentProducts] = useState([]);
    const [products, setProducts] = useState(productsToUpdate ? productsToUpdate : defaultProducts);
    const [totalSale, setTotalSale] = useState(saleToUpdate?.totalPrice ? saleToUpdate.totalPrice : 0);
    const [userName, setUserName] = useState(saleToUpdate?.userName ? saleToUpdate.userName : '');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const token = getToken();
        const response = await axios.get(ENDPOINT.GET_PRODUCTS, token);
        setCurrentProducts(response.data);
    }

    const addNewProduct = () => {
        setProducts([
            ...products,
            {
                productId: '',
                productName: '',
                productPrice: 0,
                profit: 0,
                amount: '',
                total: 0
            }
        ])
    }

    const amountOnChange = ($event, index) => {
        let newProducts = [...products];
        const amount = parseInt($event.target.value);
        const productId = newProducts[index].productId;
        newProducts[index] = {
            ...newProducts[index],
            amount,
            total: productId && amount ? calculateTotalProduct(productId, amount) : 0
        }
        calculateTotalSale(newProducts);
        setProducts(newProducts);
    }

    const productOnChange = ($event, index) => {
        const productId = $event.target.value;
        if (products.some(product => product.productId === productId)) {
            return;
        }
        let newProducts = [...products];
        const productSelected = currentProducts.find(product => product.productId === productId)
        newProducts[index] = {
            productId,
            productName: productSelected.name,
            productPrice: productSelected.salePrice,
            profit: productSelected.profit,
            amount: '',
            total: 0
        }
        setProducts(newProducts);
    }

    const removeProduct = (index) => {
        let newProducts = [...products];
        newProducts.splice(index, 1);
        calculateTotalSale(newProducts);
        setProducts(newProducts);
    }

    const calculateTotalProduct = (productId, amount) => {
        const product = currentProducts.find(product => product.productId === productId);
        return product.salePrice * amount;
    }

    const sendProducts = async () => {
        const payload = {
            date: new Date().getTime(),
            clientName: userName ? userName : "Cliente",
            saleProducts: products,
            status: 0
        };
        try {
            const token = getToken();
            setIsLoading(true);
            const response = await axios.post(ENDPOINT.NEW_SALE, payload, token)
            setIsLoading(false);
            buttonAction(response.data);
            setProducts(defaultProducts);
            setUserName('');
            setTotalSale(0);
        } catch (error) {
            setIsLoading(false);
            setErrorMsg(error.response?.data?.code || 'Error al crear la venta');
            setShowErrorModal(true);
        }
        
    }

    const updateSale = async () => {
        const payload = {
            saleId: saleToUpdate.saleId,
            clientName: userName ? userName : "Cliente",
            saleProducts: products,
        };
        try {
            const token = getToken();
            setIsLoading(true);
            const response = await axios.put(ENDPOINT.UPDATE_SALE, payload, token)
            setIsLoading(false);
            buttonAction(response.data);
        } catch (error) {
            setIsLoading(false);
            setErrorMsg(error.response?.data?.code || 'Error al actualizar la venta');
            setShowErrorModal(true);
        }
        
    }

    const nameOnChange = (event) => {
        setUserName(event.target.value);
    }

    const calculateTotalSale = productsForTotal => {
        let sumSale = 0;
        productsForTotal.forEach(product => {
            sumSale += product.total;
        })
        setTotalSale(sumSale);
    }

    const getProductAvailableAmount = (product) => {
        if (!product || !product.productId) {
            return null;
        }
        const inventoryProduct = currentProducts.find(currentProduct => currentProduct.productId === product.productId);
        if (!inventoryProduct) {
            return null;
        }
        const reservedAmount = productsToUpdate?.find(p => p.productId === product.productId)?.amount || 0;
        return inventoryProduct.amount + reservedAmount;
    }

    const isAmountInvalid = (product) => {
        if (!product || !product.amount) {
            return false;
        }
        const availableAmount = getProductAvailableAmount(product);
        if (availableAmount === null) {
            return false;
        }
        return product.amount > availableAmount;
    }

    const isButtonDisabled = () => products.some(product => !product.productId || !product.amount || isAmountInvalid(product))

    const isRemoveButtonDisabled = () => products.length && (products.length - 1)

    const buttonContent = () => {
        if (isLoading) {
            return <button type="button" className="btn btn-table btn-sm px-2 py-1"> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </button>
        } else if (saleToUpdate) {
            return <button type="button" className="btn btn-table btn-sm px-2 py-1" onClick={updateSale} disabled={isButtonDisabled()}> ACTUALIZAR </button>
        } else {
            return <button type="button" className="btn btn-table btn-sm px-2 py-1" onClick={sendProducts} disabled={isButtonDisabled()}> AGREGAR </button>
        }
    }

    return (
        <div className="cashier-form">
            <div className="row">
                <div className="col-md-3 col-6">
                    <div className="input-title">Nombre Cliente</div>
                    <input type="text" className="form-control mt-2" value={userName} onChange={nameOnChange}/>
                </div>
                <div className="col-md-9 col-12 col-offset-6 mt-3 mt-md-0">
                    <div className="row">
                        <div className="col-6 input-title">Producto</div>
                        <div className="col-2 input-title text-ellipsis">Cantidad</div>
                        <div className="col-4 input-title">Total</div>
                    </div>
                    {
                        products.map((product, index) =>
                            <div className="row align-items-center mt-2" key={index}>
                                <div className={`col-6`}>
                                    <select className="form-select cashier-select" value={product.productId} onChange={(e) => productOnChange(e, index)}>
                                        <option value="" disabled>Seleccione un producto</option>
                                        {
                                            currentProducts.length ?
                                            currentProducts.map((product, i) => <option value={product.productId} key={i}>{product.name}</option>):
                                            null
                                        }
                                    </select>
                                </div>
                                <div className="col-2">
                                    <input type="number" className={`form-control ${isAmountInvalid(product) && 'invalid-input'}`} placeholder="0" value={product.amount} onChange={(e) => amountOnChange(e, index)}/>
                                </div>
                                <div className="col-3">
                                    {"$" + new Intl.NumberFormat('es-CL').format(product.total)}
                                </div>
                                {<div className="col-1">
                                    <button type="button" className="btn btn-table btn-sm" onClick={()=>removeProduct(index)} disabled={!isRemoveButtonDisabled()}> <i className="fa-solid fa-xmark"></i></button>
                                </div>}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-8 col-md-6 offset-md-3 offset-0">
                    <button type="button" className="btn btn-table btn-sm" onClick={addNewProduct}> <i className="fa-solid fa-plus"></i></button>
                </div>
                <div className="col-3 col-md-2">
                    <p className="mb-1 fw-bold">Total Venta</p>
                    <p>{"$" + new Intl.NumberFormat('es-CL').format(totalSale)}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">
                    {buttonContent()}
                </div>
            </div>
            <ErrorModal message={errorMsg} showErrorModal={showErrorModal} closeModal={() => setShowErrorModal(false)}></ErrorModal>
        </div>
    )
}

export default CashierForm;