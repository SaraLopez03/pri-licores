import { Button } from "react-bootstrap";

const TableCell = ({value, type}) => {

    const checkType = () => {
        if(type == "currency"){
            return (
                <td> {"$" + new Intl.NumberFormat('es-CL').format(value)} </td>
            ); 
        } else if (type == "actions"){
            return (
                <td>
                    <button type="button" className="btn btn-table btn-sm mr style"> <i className="fa-regular fa-pen-to-square"></i></button>
                    <button type="button" className="btn btn-table btn-sm style"> <i className="fa-solid fa-trash-can"></i></button>
                </td>
            )
        } else {
           return <td> {value} </td>
        }
    }
    
    return checkType()
    
}

export default TableCell;