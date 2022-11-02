import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Table from "../../components/Table";

const ClosedCashier = () => {
    const[itemsClosedCashier, setItemsClosedCashier] = useState({});
    const[closeSales,setCloseSales] = useState(false)

    const closeSale = () => {
        setCloseSales(true)
    }

    const closeModalSale = () => {
        setCloseSales(false)
    }

    const columnClosedCashier = [
        {
            name: "Fecha",
            key: "",
            type: "date"
        },
        {
            name: "Nombre Cliente",
            key: "",
            type: "text"
        },
        {
            name: "Total",
            key: "",
            type: "text"
        },
        {
            name: "Metodo Pago",
            key: "",
            type: "text"
        }
    ]
    return (
        <div className="row mx-4">
            <div className="col-md-8">
                <h1 className="style-title-page mt-4"> CIERRE DE CAJA </h1>
                <div className="mt-5"> 
                    <Table columnNames={columnClosedCashier} items={itemsClosedCashier}/>
                </div>
            </div>
            <div className="col-md-4 mt-5">
                <div className="cards-closed mb-4 ">
                    <p className="bold"> Total Ventas: <span>500,000</span></p>
                    <p className="bold"> Utilidad: <span>200,000</span></p>
                </div>
                <div className="cards-closed mb-5">
                    <p className="bold"> Efectivo: <span>200,000</span></p>
                    <p className="bold"> Transferencia: <span>300,000</span></p>
                </div>   
                <button className="btn-primary btn style-buttom-closed" onClick={closeSale}> CERRAR CAJA </button>  
            </div>
            <Modal show={closeSales} onHide={closeModalSale}>
                <ModalHeader className="style-modal-header">
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
                        <button className="btn btn-primary me-4 button-closed"> Si </button>
                        <button className="btn btn-primary button-closed" onClick={closeModalSale}> No </button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )   

}

export default ClosedCashier;