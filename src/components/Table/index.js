import React from "react";
import TableCell from "./component/TableCell";


const Table = ({columnNames, items}) => {
    return(
        <div className="table-responsive">
             <table className="table table-hover">
                <thead>
                    <tr>
                        {
                            columnNames.map((column,index)=>{
                                return(
                                    column.type === 'actions' ?
                                    <th key={index} scope="col" className="d-flex justify-content-center">{column.name}</th>:
                                    <th key={index} scope="col">{column.name}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length ?
                            items.map((item,index) => <tr key={index}>
                                                    {
                                                        columnNames.map((column, index) => 
                                                            <TableCell key={index} value={item[column.key]} columnConfig={column} item={item}/>
                                                        )
                                                    }
                                                </tr>
                                                    
                                ):
                            <tr><td colSpan={"100%"}>no found</td></tr>
                    }
                </tbody>
                </table>
        </div>
    )   
}

export default Table;