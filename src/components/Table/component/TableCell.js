import { Button } from "react-bootstrap";

const TableCell = ({value, columnConfig, item}) => {

    const checkType = () => {
        if(columnConfig.type == "currency"){
            return (
                <td> {"$" + new Intl.NumberFormat('es-CL').format(value)} </td>
            ); 
        } else if (columnConfig.type == "actions"){
            return (
                <td className="d-flex justify-content-center">
                    {
                        columnConfig.buttons.map((oneButton, index) => {
                            return (
                                <button type="button" className="btn btn-table btn-sm me-2" key={index} onClick={() => {oneButton.action(item)}}> <i className={oneButton.iconClass}></i></button>
                            )
                        })
                    }

                </td>
            )
        } else {
           return <td> {value} </td>
        }
    }
    
    return checkType()
    
}

export default TableCell;