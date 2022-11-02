import { useEffect, useState } from "react";
import { ENDPOINT } from "../../../constants/endpointConstants"
import axios from 'axios';

const CashierForm = ({buttonAction, type}) => {
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
    const [products, setProducts] = useState(defaultProducts);
    const [totalSale, setTotalSale] = useState(0);
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const storeToken = localStorage.getItem("userToken");
        const apiOptions = {
            headers: {
                authorization: `Bearer ${storeToken}` 
            }
        }
        const response = await axios.get(ENDPOINT.GET_PRODUCTS, apiOptions);
        setCurrentProducts(response.data);
    }

    const addNewProduct = () => {
        setProducts([
            ... products,
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
        let newProducts = [... products];
        const amount = parseInt($event.target.value);
        const productId = newProducts[index].productId;
        newProducts[index] = {
            ... newProducts[index],
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
        let newProducts = [... products];
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
        let newProducts = [... products];
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
            date: (new Date).getTime(),
            clientName: userName ? userName : "Cliente",
            saleProducts: products,
            status: 0
        };
        try {
            const storeToken = localStorage.getItem("userToken");
            const apiOptions = {
                headers: {
                    authorization: `Bearer ${storeToken}` 
                }
            };
            setIsLoading(true);
            const response = await axios.post(ENDPOINT.NEW_SALE, payload, apiOptions)
            setIsLoading(false);
            buttonAction(response.data);
            setProducts(defaultProducts);
            setUserName('');
        } catch (error) {
            setIsLoading(false);
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

    const isButtonDisabled = () => products.some(product => !product.productId || !product.amount)

    const isRemoveButtonDisabled = () => products.length && (products.length - 1)

    const buttonContent = () => {
        if (isLoading) {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        } else {
            return "AGREGAR"
        }
    }

    return (
        <div className="cashier-form">
            <div className="row">
                <div className="col-md-3 col-6">
                    <div className="input-title">Nombre Cliente</div>
                    <input type="text" className="form-control" value={userName} onChange={nameOnChange}/>
                </div>
                <div className="col-md-9 col-12 col-offset-6 mt-3 mt-md-0">
                    <div className="row">
                        <div className="col-6 input-title">Producto</div>
                        <div className="col-2 input-title text-ellipsis">Cantidad</div>
                        <div className="col-4 input-title">Total</div>
                    </div>
                    {
                        products.map((product, index) =>
                            <div className="row align-items-center" key={index}>
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
                                    <input type="number" className='form-control' placeholder="0" value={product.amount} onChange={(e) => amountOnChange(e, index)}/>
                                </div>
                                <div className="col-3">
                                    {"$" + new Intl.NumberFormat('es-CL').format(product.total)}
                                </div>
                                <div className="col-1">
                                    <button type="button" className="btn btn-table btn-sm" onClick={()=>removeProduct(index)} disabled={!isRemoveButtonDisabled()}> <i className="fa-solid fa-xmark"></i></button>
                                </div>
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
                    <button type="button" className="btn btn-table btn-sm px-2 py-1" onClick={sendProducts} disabled={isButtonDisabled()}> {buttonContent()} </button>
                </div>
            </div> 
        </div>
    )
}

export default CashierForm;