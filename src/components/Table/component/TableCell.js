import { Button } from "react-bootstrap";
import { PAYMENT_METHOD } from "../../../constants/sharedConstans";

const TableCell = ({value, columnConfig, item}) => {

    const checkType = () => {
        if(columnConfig.type == "currency"){
            return (
                <td> {"$" + new Intl.NumberFormat('es-CL').format(value)} </td>
            ); 
        } else if (columnConfig.type == "actions"){
            return (
                <td>
                    {
                        columnConfig.buttons.map((oneButton, index) => {
                            return (
                                <button type="button" className="btn btn-table btn-sm me-2" key={index} onClick={(e) => {oneButton.action(item);e.stopPropagation();}}> <i className={oneButton.iconClass}></i></button>
                            )
                        })
                    }

                </td>
            )
        } else if(columnConfig.type == "date") {
            let formatDay = new Date(value)
            return (
               <td> {formatDay.toLocaleDateString("es-CL")} </td> 
            )

        } else if (columnConfig.type == "paymentMethod") {
            return (
                <td> {PAYMENT_METHOD[value]}</td>
            )

        }else {
           return <td> {value} </td>
        }
    }
    
    return checkType()
    
}

export default TableCell;