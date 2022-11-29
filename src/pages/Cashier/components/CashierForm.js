import { useEffect, useState } from "react";
import { ENDPOINT } from "../../../constants/endpointConstants"
import axios from 'axios';
import { getToken } from "../../../utils/utils";
import Select from 'react-select';

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
    let isFormDisabled = false;

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const token = getToken();
        const response = await axios.get(ENDPOINT.GET_PRODUCTS, token);
        setCurrentProducts(response.data);
        console.log(currentProducts)

        const array = [];
        for (let i = 0; i < array.length; i++) {
            const newFilter = { 
                value: currentProducts[i].productId,
                label: currentProducts[i].name 
            };
            console.log(newFilter)
        }
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

    const isButtonDisabled = () => isFormDisabled || products.some(product => !product.productId || !product.amount)

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

    const isAmountValid = (product) => {
        if (!product) {
            return
        }
        const inventoryProduct = currentProducts.find(currentProduct => currentProduct.productId === product.productId);
        if (inventoryProduct && product.amount > inventoryProduct.amount) {
            isFormDisabled = true;
            return true
        } else {
            return false
        }
    }

    const filter = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

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
                                    <Select options={filter} placeholder="Seleccione un producto" onChange={(e) => productOnChange(e, index)}>
                                        {/* <option value="" disabled>Seleccione un producto</option>
                                        {
                                            currentProducts.length ?
                                            currentProducts.map((product, i) => <option value={product.productId} key={i}>{product.name}</option>):
                                            null
                                        } */}
                                    </Select>
                                </div>
                                <div className="col-2">
                                    <input type="number" className={`form-control ${isAmountValid(product) && 'invalid-input'}`} placeholder="0" value={product.amount} onChange={(e) => amountOnChange(e, index)}/>
                                </div>
                                <div className="col-3">
                                    {"$" + new Intl.NumberFormat('es-CL').format(product.total)}
                                </div>
                                {!saleToUpdate && <div className="col-1">
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
        </div>
    )
}

export default CashierForm;