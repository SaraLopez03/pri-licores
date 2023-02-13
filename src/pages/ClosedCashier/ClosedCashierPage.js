import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Table from "../../components/Table";
import { ENDPOINT } from "../../constants/endpointConstants";
import { getToken, getUserData } from "../../utils/utils"
import CloseCashierCard  from "./components/CloseCashierCard";



const ClosedCashier = () => {
    const defaultCards = [
        [
            {
                name: 'Total Ventas',
                value: 0
            },
            {
                name: 'Utilidad',
                value: 0
            }
        ],
        [
            {
                name: 'Efectivo',
                value: 0
            },
            {
                name: 'Transferencia',
                value: 0
            }
        ]
        
    ]
    
    const [itemsClosedCashier, setItemsClosedCashier] = useState([]);
    const [cashierData, setCashierData] = useState([...defaultCards]);
    const[closeSales,setCloseSales] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSales, setIsLoadingSales] = useState(false);

    useEffect(() => {
        getPendingSales();
    }, []);

    const getPendingSales = async () => {
        try {
            const token = getToken();
            setIsLoadingSales(true);
            const response = await axios.get(ENDPOINT.GET_PENDING_SALES, token);
            const {sales, profit, total, transferAmount, cashAmount} = response.data;
            setItemsClosedCashier(sales);
            const newCashierData = [...defaultCards];
            newCashierData[0][0].value = total;
            newCashierData[0][1].value = profit;
            newCashierData[1][0].value = cashAmount;
            newCashierData[1][1].value = transferAmount;
            setCashierData(newCashierData);
            setIsLoadingSales(false);

        } catch (error) {
            console.log('ERROR GETTING PENDING SALE');
            setIsLoadingSales(false);
        }
    }

    const closeSale = () => {
        setCloseSales(true)
    }

    const closeModalSale = () => {
        setCloseSales(false)
    }

    const closeCashier = async () => {
        try {
            const token = getToken();
            setIsLoading(true);
            const {userId, name} = getUserData();
            const response = await axios.post(ENDPOINT.CLOSE_PENDING_SALES,{userId, name},token);
            setItemsClosedCashier([]);
            console.log({defaultCards});
            setCashierData(defaultCards);
            setIsLoading(false);
            closeModalSale();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const getButtonContent = () => {
        if (isLoading) {
            return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        } else {
            return 'Si';
        }
    }

    const columnClosedCashier = [
        {
            name: "Fecha",
            key: "date",
            type: "date"
        },
        {
            name: "Nombre Cliente",
            key: "clientName",
            type: "text"
        },
        {
            name: "Total",
            key: "totalPrice",
            type: "currency"
        },
        {
            name: "Metodo Pago",
            key: "paymentMethodId",
            type: "paymentMethod"
        }
    ]

    

    

    return (
        <div className="row mx-4">
            <div className="row">
                <h1 className="style-title-page mt-4"> CIERRE DE CAJA </h1>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-8 col-12 order-1 order-md-0">
                    <div className="mt-5"> 
                        <Table columnNames={columnClosedCashier} items={itemsClosedCashier} fixSize={'t-responsive-medium'} isLoading={isLoadingSales}/>
                    </div>
                </div>
                <div className="col-md-3 col-12 mt-md-5 mt-4">
                    {cashierData && cashierData.map((card, i) =>  <CloseCashierCard key={i} list={card}/>)}
                    <button className="btn-primary btn style-buttom-closed mt-4" onClick={closeSale}> CERRAR CAJA </button>  
                </div>
            </div>
            <Modal show={closeSales} onHide={closeModalSale}>
                <ModalHeader closeButton className="style-modal-header">
                    <ModalTitle className="text-modal"> CIERRE DE CAJA</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <p> ¿Estas seguro que desea realizar cierre de caja? </p>
                        <p className="yellow-color"> (Recuerda revisar que tengas el mismo efectivo y transferencias) </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex w-100 justify-content-center">
                        <button className="btn btn-primary me-4 button-closed" onClick={closeCashier}> {getButtonContent()} </button>
                        <button className="btn btn-primary button-closed" onClick={closeModalSale}> No </button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )   

}

export default ClosedCashier;