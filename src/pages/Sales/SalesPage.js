import { useEffect, useState } from "react";
import Table from "../../components/Table";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ENDPOINT } from "../../constants/endpointConstants";
import { getRangeDates, getToken } from "../../utils/utils";
import { Modal } from "react-bootstrap";

const  SalesPages = () => {
    const[items, setItems] = useState([]);
    const [dateRange, setDateRange] = useState(getRangeDates(new Date(), new Date()));
    const [startDate, endDate] = dateRange;
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [saleSelected, setSaleSelected] = useState({});
    const [salesInformations, setSalesInformations] = useState({
        sales: [],
        profit: 0,
        total: 0
    });
    const [isLoadingSales, setIsLoadingSales] = useState(false)

    const datePickerOnChange = (update) => {
        setDateRange(update)
        if(update[0] && update[1]){
            const [dateInit, dateFinish] = getRangeDates(update[0], update[1]);
            bringDate(dateInit.getTime(),dateFinish.getTime()) 
        } 
    } 

    const bringDate = async (dateInit,dateFinish) => {
        let statusDate = {
            startDate: dateInit,
            endDate: dateFinish,
        }
        const token = getToken()
        try {
            setIsLoadingSales(true);
            const {data} = await axios.post(ENDPOINT.POST_SALES_BY_DATES,statusDate,token)
            const formattedData = {
                ...data,
                sales: data.sales.map(sale => ({
                    ...sale,
                    onCharge: sale.auditInfo?.userName
                }))
            }
            setSalesInformations(formattedData)
            setIsLoadingSales(false);
        } catch (error) {
            setIsLoadingSales(false);
        }
    }
    useEffect( () => {
        bringDate(startDate.getTime(),endDate.getTime());
    }, [])

    const closeDetailModal = () => {
        setShowDetailModal(false);
    }

    const saleClick = sale => {
        let formattedSale = {... sale};
        formattedSale.saleProducts = formattedSale.saleProducts.map(product => ({
            ... product,
            total: product.amount * product.productPrice
        }))
        setSaleSelected(formattedSale);
        setShowDetailModal(true);
    }

    const salesColumns = [
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
        },
        {
            name: "Encargado",
            key: "onCharge",
            type: "text"
        },
    ];

    const detailTableColumns = [
        {
            name: 'Producto',
            key: 'productName',
            type: 'text'
        },
        {
            name: 'Cantidad',
            key: 'amount',
            type: 'text'
        },
        {
            name: 'Precio unidad',
            key: 'productPrice',
            type: 'currency'
        },
        {
            name: 'Total',
            key: 'total',
            type: 'currency'
        },
    ]

    
    return (
        <div>
            <div className="row mx-4">
                <div className=" col-md-12"> 
                    <h1 className="style-title-page mt-5"> REPORTE DE VENTAS </h1>
                    <div className="row">
                        <div className="col-md-9 col-12 mb-4">
                            <p className="mt-4 mb-4"> Selecciona la fecha o el rango de fechas a consultar </p>
                            <div className="row">
                                <div className="col-md-3 col-8">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        dateFormat="yyyy/MM/dd"
                                        endDate={endDate}
                                        onChange={datePickerOnChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <div className="row mt-md-0 mt-3">
                                <div className="col-md-12 col-6">
                                    <div className="style-cards" >
                                        <i className="fa-solid fa-file-invoice-dollar style-icon-sale"></i>
                                        <div className="d-flex  flex-column">
                                            <p className="bold"> Total </p>
                                            <p > { "$" + new Intl.NumberFormat('es-CL').format(salesInformations.total)} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-6">
                                    <div className="style-cards mt-md-3">
                                        <i className="fa-regular fa-lightbulb style-icon-sale"></i>
                                        <div className="d-flex flex-column">
                                            <p className="bold"> Utilidad </p>
                                            <p> {"$" + new Intl.NumberFormat('es-CL').format(salesInformations.profit)} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-9">
                            <Table columnNames={salesColumns} items={salesInformations.sales ? salesInformations.sales : []} fixSize={'t-responsive-medium'} itemClick={saleClick} isLoading={isLoadingSales}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showDetailModal} onHide={closeDetailModal}>
                <Modal.Header closeButton className="style-modal-header">
                    <div className="modal-user-name">
                        <i className="fa-solid fa-user-large me-1"></i>
                        <span>{saleSelected.clientName}</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Table columnNames={detailTableColumns} items={saleSelected.saleProducts} fixSize={'t-responsive-medium'}></Table>
                </Modal.Body>
            </Modal>
        </div>
        
    )
        
}

export default SalesPages;
