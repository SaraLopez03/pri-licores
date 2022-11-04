import React from "react";
import TableCell from "./component/TableCell";


const Table = ({columnNames, items, fixSize, itemClick}) => {
    return(
        <div className="table-responsive">
             <table className={`table table-hover ${fixSize ? 't-responsive' : ''}`}>
                <thead>
                    <tr>
                        {
                            columnNames.map((column,index)=>{
                                return(
                                    <th key={index} scope="col" className={`${column.colSize ? column.colSize : ''}`}>{column.name}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length ?
                            items.map((item,index) => <tr key={index} className={`${itemClick && 'row-click'}`} onClick={itemClick ? () => itemClick(item) : undefined}>
                                                    {
                                                        columnNames.map((column, index) => 
                                                            <TableCell key={index} value={item[column.key]} columnConfig={column} item={item}/>
                                                        )
                                                    }
                                                </tr>
                                                    
                                ):
                            <tr><td colSpan={"100%"}>No hay registros</td></tr>
                    }
                </tbody>
                </table>
        </div>
    )   
}

export default Table;