import axios from "axios";
import CashierForm from "./components/CashierForm";
import { ENDPOINT } from "../../constants/endpointConstants";
import CashierOpenSales from "./components/CashierOpenSales";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { getToken } from "../../utils/utils";

const CashierPage = () => {

    const [openSales, setOpenSales] = useState([]);
    const [showUpdateSale, setShowUpdateSale] = useState(false);
    const [saleToUpdate, setSaleToUpdate] = useState('');
    const [productsToUpdate, setProductsToUpdate] = useState(undefined);

    useEffect(() => {
        getOpenSale()
    }, []);

    const getOpenSale = async () => {
        try {
            const token = getToken();
            const response = await axios.get(ENDPOINT.OPEN_SALES, token)
            setOpenSales(response.data);
        } catch (error) {
        }
    }

    const getCurrentProducts = (products) => {
        createNewSale(products)
    }

    const createNewSale = async (newSale) => {
        let newOpenSales = [... openSales];
        newOpenSales.push(newSale)
        newOpenSales = newOpenSales.sort((a,b) => b.date - a.date);
        setOpenSales(newOpenSales);
    }

    const getProductsToUpdate = (saleUpdated) => {
        
        const saleIndex = openSales.findIndex(sale => sale.saleId === saleUpdated.saleId);
        let newSales = [... openSales];
        
        newSales[saleIndex] = saleUpdated;

        setOpenSales(newSales);
        closeUpdateModal();
    }

    const closeUpdateModal = () => setShowUpdateSale(false);

    const clickOpenSale = sale => {
        let productsFromTable = [... sale.saleProducts];
        productsFromTable = productsFromTable.map(product => ({
            ... product,
            total: product.amount * product.productPrice
        }))
        setSaleToUpdate({
            userName: sale.clientName,
            saleId: sale.saleId,
            totalPrice: sale.totalPrice
        });
        setProductsToUpdate(productsFromTable);
        setShowUpdateSale(true);
    }
    
    const paySale = (saleId) => {
        setOpenSales(openSales.filter(sale => sale.saleId != saleId));
    }
    

    return (
        <div>
            <div className="row mx-4 mt-5">
                <div className="col-12 col-md-6">
                    <CashierForm buttonAction={getCurrentProducts}/>
                </div>
                <div className="col-12 col-md-6 mt-md-0 mt-5">
                    <CashierOpenSales sales={openSales} itemClick={clickOpenSale} paySaleParent={paySale}/>
                </div>
            </div>
            <Modal show={showUpdateSale} onHide={closeUpdateModal} size="lg">
                <ModalBody>
                    <CashierForm buttonAction={getProductsToUpdate} saleToUpdate={saleToUpdate} productsToUpdate={productsToUpdate}/>
                </ModalBody>

            </Modal>
        </div>
      
    )
}

export default CashierPage;