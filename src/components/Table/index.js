import React from "react";


const Table = ({columnNames, products}) => {
    return(
        <div>
             <table className="table table-hover">
                <thead>
                    <tr>
                        {
                            columnNames.map((column,index)=>{
                                return(
                                    <th key={index} scope="col">{column}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length &&
                            products.map(product => <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    
                                )
                    }
                </tbody>
                </table>
        </div>
    )   
}

export default Table;