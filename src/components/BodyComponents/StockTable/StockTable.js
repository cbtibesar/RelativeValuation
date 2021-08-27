import StockTableRow from "./StockTableRow/StockTableRow";
import './StockTable.css'

const StockTable=({ stocks, averageData, onDelete })=> {

    return(
        <table style={{position:'sticky', left:'1%', width:'95%' }}>
            <thead key='tableHeader'>
                <tr key='headerRow'>
                    <th className='delete'></th>
                    <th>Ticker</th>
                    <th>Company</th>
                    <th>Sector</th>
                    <th>Current Price</th>
                    <th>Market Cap</th>
                    <th>Enterprise Value</th>
                    <th>Forward PE</th>
                    <th>Enterprise to Revenue</th>
                    <th>Enterprise to EBITDA</th>
                    <th>Profit Margins</th>
                    <th>ROE</th>
                </tr>
            </thead>
            <tbody key='stocksData'>
                {
                    stocks.map((stock) => (
                      <StockTableRow stock={ stock } averageData={ averageData } onDelete={ onDelete } />
                    ))
                }
            </tbody>

        </table>
    );
}

export default StockTable