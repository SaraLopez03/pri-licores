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
                                                            <TableCell key={index} value={item[column.key]} type={column.type}/>
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