import axios from "axios";
import { useState } from "react";
import { Modal, ModalBody} from "react-bootstrap";
import Table from "../../../components/Table";
import { ENDPOINT } from "../../../constants/endpointConstants";
import { getToken } from "../../../utils/utils";


const CashierOpenSales = ({sales, itemClick, paySaleParent}) => {
    const[paySaleModal, setPaySaleModal] = useState(false);
    const[saleId, setSaleId] = useState("");
    const[paymentMethodId, setPaymentMethodId] = useState(0);
    const[totalPrice, setTotalPrice] = useState(0);
    const[valueReceibed, setValueReceibed] = useState(0);
    const[loading, setLoading] = useState(false);


    const paySale = sale => {
        setTotalPrice(sale.totalPrice)
        setSaleId(sale.saleId)
        setPaySaleModal(true)
    }

    const closePaySale = () => {
        setPaySaleModal(false)
    }

    const paymentMethodChange = (event) => {
        setPaymentMethodId(parseInt(event.target.value))
    }

    const valueReceibedChange = (event) => {
        const value = event.target.value;
        if (value === "") {
            setValueReceibed(0)
        } else {
            setValueReceibed(parseInt(value))
        }
        // setValueReceibed(value === "" ? 0 : parseInt(value))
    }


    const payFinish = async () => {
        let sale = {
            saleId: saleId,
            paymentMethodId: paymentMethodId
        }
        const token = getToken();
        try {
            setLoading(true);
            const submitSale = await axios.post(ENDPOINT.POST_PAY_SALE,sale,token)
            paySaleParent(sale.saleId);
            setPaySaleModal(false);
            setLoading(false);
            setValueReceibed(0);
        } catch (error) {
            console.log(error)
        }
    }

    const operationChange = () => {
        if(valueReceibed === 0) {
            return 0;
        } else {
            return valueReceibed - totalPrice;
        }
    }

    const isButtonDisabled = () =>{
        if(paymentMethodId === 1){
            return false;
        }else if(valueReceibed < totalPrice){
            return true;
        } else{
            return false;
        }
    }

    const buttonLoading = () => {
        if(loading === false){
            return "Pagar"
        } else {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        }
    }


    const openSalesColumn = [
        {
            name: "Nombre",
            key: "clientName",
            colSize:'col-4',
            type: "text"
        },
        {
            name: "Valor",
            key: "totalPrice",
            colSize:'col-4',
            type: "currency"
        },
        {
            name: "Acciones",
            type: "actions",
            colSize:'col-4',
            buttons: [
                {
                    iconClass: "fa-solid fa-hand-holding-dollar",
                    action: paySale 
                }
            ]
        },
    ]

    
    return (
        <div>
            <div className="row text-center fw-bold">
                <h2>Pedidos Abiertos</h2>
            </div>
            <div className="row ps-md-5 ps-0 mt-4">
                <Table columnNames={openSalesColumn} items={sales} itemClick={itemClick}/>
            </div>
            <Modal show={paySaleModal} onHide={closePaySale}>
                <ModalBody>
                    <div className="row justify-content-center text-center mb-4">
                        <span className="fw-bold">TOTAL</span>
                        <p className="mb-0 mt-1"> {"$" + new Intl.NumberFormat('es-CL').format(totalPrice)}</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 fw-bold">
                            <p className="mb-0"> Metodo de pago </p>
                        </div>
                        <div className="col-md-5">
                            <select className="form-select" value={paymentMethodId} onChange={paymentMethodChange}>
                                <option value={0}> Efectivo </option>
                                <option value={1}> Transferencia </option>
                            </select>
                        </div>
                    </div>
                    { paymentMethodId === 0 && <div className="row mt-4 justify-content-center">
                        <div className="col-md-4 fw-bold">
                            <p className="mb-0"> Valor recibido </p>
                        </div>
                        <div className="col-md-5">
                            <input type="number" className="form-control" value={valueReceibed === 0 ? "" : valueReceibed} onChange={valueReceibedChange} />
                        </div>
                    </div>}
                    <div className="row mt-4 align-items-center">
                        <div className="col-md-6 col-6">
                            <button className="btn btn-primary size mb-0" onClick={payFinish} disabled={isButtonDisabled()}> {buttonLoading()} </button>
                        </div>
                        { paymentMethodId === 0 && <div className="col-md-6 col-6 d-flex">
                            <p className="mb-0 fw-bold me-2"> Cambio: </p>
                            <p className="mb-0"> {"$" + new Intl.NumberFormat('es-CL').format(operationChange())}</p>
                        </div>}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CashierOpenSales;