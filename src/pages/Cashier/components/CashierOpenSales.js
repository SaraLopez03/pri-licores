import Table from "../../../components/Table";

const CashierOpenSales = ({sales, itemClick}) => {

    const paySale = sale => {
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
        </div>
    )
}

export default CashierOpenSales;