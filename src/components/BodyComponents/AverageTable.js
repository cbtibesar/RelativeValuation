const AverageTable =({ averageData })=>{
    const billion = 1000000000

    return(
        <table style={{margin:'auto'}}>
            <thead>
                <tr key='averageHeader'>
                    <th>Market Cap</th>
                    <th>Enterprise Value</th>
                    <th>Forward PE</th>
                    <th>Enterprise to Revenue</th>
                    <th>Enterprise to EBITDA</th>
                    <th>Profit Margins</th>
                    <th>ROE</th>
                </tr>
            </thead>
            <tbody>
            {
                averageData.map((averageData)=>(
                    <tr key='averageData'>
                           <td>{ (averageData.marketCap /billion).toFixed(2)}</td>
                           <td>{ (averageData.enterpriseValue/billion).toFixed(2) }</td>
                           <td>{ averageData.forwardPE.toFixed(2) }</td>
                           <td>{ averageData.enterpriseToRev.toFixed(2) }</td>
                           <td>{ averageData.enterpriseToEbitda.toFixed(2) }</td>
                           <td>{ averageData.profitMargins.toFixed(2) }</td>
                           <td>{ averageData.roe.toFixed(2) }</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default AverageTable