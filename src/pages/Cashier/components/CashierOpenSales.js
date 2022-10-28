import Table from "../../../components/Table";

const CashierOpenSales = ({sales}) => {

    const paySale = sale => {
        console.log({sale});
    }

    const openSalesColumn = [
        {
            name: "Nombre",
            key: "clientName",
            type: "text"
        },
        {
            name: "Valor",
            key: "totalPrice",
            type: "currency"
        },
        {
            name: "Acciones",
            type: "actions",
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
            <div className="row ps-5 mt-4">
                <Table columnNames={openSalesColumn} items={sales}/>
            </div>
        </div>
    )
}

export default CashierOpenSales;