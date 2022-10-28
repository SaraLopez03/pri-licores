import axios from "axios";
import CashierForm from "./components/CashierForm";
import { ENDPOINT } from "../../constants/endpointConstants";
import CashierOpenSales from "./components/CashierOpenSales";
import { useEffect, useState } from "react";

const CashierPage = () => {

    const [openSales, setOpenSales] = useState([]);

    useEffect(() => {
        getOpenSale()
    }, []);

    const getOpenSale = async () => {
        try {
            const storeToken = localStorage.getItem("userToken");
            const apiOptions = {
                headers: {
                    authorization: `Bearer ${storeToken}` 
                }
        }
            const response = await axios.get(ENDPOINT.OPEN_SALES,apiOptions)
            setOpenSales(response.data);
        } catch (error) {
            console.log("ERROR OPEN SALES");
        }
    }

    const getCurrentProducts = (products) => {
        console.log(products);
        createNewSale(products)
    }

    const createNewSale = async (newSale) => {
        let newOpenSales = [... openSales];
        newOpenSales.push(newSale)
        newOpenSales = newOpenSales.sort((a,b) => b.date - a.date);
        setOpenSales(newOpenSales);
    }
    

    return (
        <div>
            <div className="row mx-4 mt-5">
                <div className="col-12 col-md-6">
                    <CashierForm buttonAction={getCurrentProducts}/>
                </div>
                <div className="col-12 col-md-6">
                    <CashierOpenSales sales={openSales}/>
                </div>
            </div>
        </div>
      
    )
}

export default CashierPage;