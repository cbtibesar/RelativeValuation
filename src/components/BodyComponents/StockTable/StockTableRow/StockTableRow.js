import React, {useState} from "react";
import DeleteButton from "./DeleteButton";

const StockTableRow = ({ stock, averageData, onDelete }) => {
    const billion = 1000000000
    const average = averageData[0]
    const NULL_FIELD_MAGIC_NUMBER = -420.69
    const [show, setShow] = useState(false)
    return(
         <tr key={ stock.ticker }>
             <td className='delete' onMouseEnter={ ()=> setShow(true) } onMouseLeave={ ()=> setShow(false) }> <DeleteButton  show={ show } stock={ stock } onDelete={ onDelete } /> </td>
             <td>{ stock.ticker }</td>
             <td>{ stock.companyName }</td>
             <td>{ stock.sector }</td>
             {
                 (stock.currentPrice === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> : <td>{ stock.currentPrice }</td>
                    
             }

             {
                 (stock.marketCap === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.marketCap>=average.marketCap) ? 'above-average':'below-average'}>{ (stock.marketCap /billion).toFixed(2) }</td>
             }
             
             {
                 (stock.enterpriseValue === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.enterpriseValue>=average.enterpriseValue) ? 'above-average':'below-average'}>{ (stock.enterpriseValue /billion).toFixed(2) }</td>
             }
             
             {
                 (stock.forwardPE === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.forwardPE<=average.forwardPE) ? 'above-average':'below-average'}>{ (stock.forwardPE).toFixed(2) }</td>
             }
             
             {
                 (stock.enterpriseToRev === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.enterpriseToRev>=average.enterpriseToRev) ? 'above-average':'below-average'}>{ (stock.enterpriseToRev).toFixed(2) }</td>
             }
             
             {
                 (stock.enterpriseToEbitda === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.enterpriseToEbitda>=average.enterpriseToEbitda) ? 'above-average':'below-average'}>{ (stock.enterpriseToEbitda).toFixed(2) }</td>
             }
             
             {
                 (stock.profitMargins === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                     <td className={(stock.profitMargins>=average.profitMargins) ? 'above-average':'below-average'}>{ (stock.profitMargins).toFixed(3) }</td>
             }
             
             {
                 (stock.roe === NULL_FIELD_MAGIC_NUMBER) ? <td>N/A</td> :
                    <td className={(stock.roe>=average.roe) ? 'above-average':'below-average'}>{ (stock.roe).toFixed(2) }</td>
             }   
         </tr>
    )

}
export default StockTableRow