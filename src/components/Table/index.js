import React from "react";
import TableCell from "./component/TableCell";


const Table = ({columnNames, items}) => {
    return(
        <div>
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
                        items.length &&
                            items.map(item => <tr>
                                                    {
                                                        columnNames.map((column, index) => 
                                                            <TableCell value={item[column.key]} type={column.type}/>
                                                        )
                                                    }
                                                </tr>
                                                    
                                )
                    }
                </tbody>
                </table>
        </div>
    )   
}

export default Table;