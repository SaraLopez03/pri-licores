import Table from "../../../components/Table";

const CashierOpenSales = ({sales}) => {

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
            <div className="row text-center">
                <h2>Pedidos Abiertos</h2>
            </div>
            <div className="row ps-md-5 ps-0 mt-4">
                <Table columnNames={openSalesColumn} items={sales}/>
            </div>
        </div>
    )
}

export default CashierOpenSales;