import NavBar from "../../components/NavBar";
import Table from "../../components/Table";

const SalesPage = () => {
    return(
        <div>
            <NavBar/>
            <div className="mx-4">
                <h1 className=" style-title-page mt-4">REPORTE DE VENTAS</h1>
                <p className="mt-4"> Selecciona la fecha o el rango de fechas a consultar</p>

            </div>

        </div>
    )
}

export default SalesPage;