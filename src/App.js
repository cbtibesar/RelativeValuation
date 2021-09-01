import StockTable from "./components/BodyComponents/StockTable/StockTable";
import {useEffect, useState} from "react";
import axios from "axios";
import AddStock from "./components/BodyComponents/AddStock";
import AverageTable from "./components/BodyComponents/AverageTable";
import Navbar from "./components/Navbar/Navbar";
import './components/BodyComponents/BodyComponents.css'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


const App =()=> {
    const [stocksData, setStocksData] = useState([])
    const [averageData, setAverageData] = useState([])
    const NULL_FIELD_MAGIC_NUMBER = -420.69

    const containsObject = (obj, list) => {
        for (var i = 0; i < list.length; i++) {
            if (list[i].ticker === obj) {
                return true;
            }
        }
        return false
    }



    const updateAverageData =(stocks) => {
        if(stocks.length>0){
            let numPE=0, numEV=0, numEtR=0, numEtE=0, numMC=0, numPM=0, numROE=0
            let totalPE=0, totalEV=0, totalEtR=0, totalEtE=0, totalMC=0, totalPM=0, totalROE=0

            for(let i =0; i<stocks.length; i++){
                const stock = stocks[i]
                if(stock.forwardPE !== NULL_FIELD_MAGIC_NUMBER) {
                    totalPE += stock.forwardPE
                    numPE += 1
                }
                if(stock.enterpriseValue !== NULL_FIELD_MAGIC_NUMBER) {
                    totalEV += stock.enterpriseValue
                    numEV += 1
                }
                if(stock.enterpriseToRev !== NULL_FIELD_MAGIC_NUMBER) {
                    totalEtR += stock.enterpriseToRev
                    numEtR += 1
                }
                if(stock.enterpriseToEbitda !== NULL_FIELD_MAGIC_NUMBER) {
                    totalEtE += stock.enterpriseToEbitda
                    numEtE += 1
                }
                if(stock.marketCap !== NULL_FIELD_MAGIC_NUMBER) {
                    totalMC += stock.marketCap
                    numMC += 1
                }
                if(stock.profitMargins !== NULL_FIELD_MAGIC_NUMBER) {
                    totalPM += stock.profitMargins
                    numPM += 1
                }
                if(stock.roe !== NULL_FIELD_MAGIC_NUMBER) {
                    totalROE += stock.roe
                    numROE += 1
                }
            }
            setAverageData([{forwardPE:(totalPE/numPE),
            enterpriseValue:(totalEV/numEV),
            enterpriseToRev:(totalEtR/numEtR),
            enterpriseToEbitda:(totalEtE/numEtE),
            marketCap:(totalMC/numMC),
            profitMargins:(totalPM/numPM),
            roe:(totalROE/numROE)}])
        }else{setAverageData([])}

    }

    useEffect(()=> {
         axios.get("stocks/")
          .then(res => {
              updateAverageData(res.data.stocksData)
              setStocksData(res.data.stocksData)

          }).catch(error => console.error('Error: $(error)'))
    }, [])

    const onAdd =(ticker)=>{
        if(!containsObject(ticker, stocksData)){
            axios.post("stocks/", {ticker:ticker})
                .then(res => {
                updateAverageData([...stocksData, res.data])
                setStocksData([...stocksData, res.data])
                }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
                })
        }else {alert("Stock already in list!")}

    }

    const onDelete = ({ ticker }) =>{
        axios.delete("stocks/delete-stock/" + ticker)
        setStocksData(stocksData.filter((stock) => stock.ticker !== ticker))
        updateAverageData(stocksData.filter((stock) => stock.ticker !== ticker))
    }

    return (
    <div className="App">
        <Navbar/>
        <AddStock onAdd={ onAdd }/>
        {
            (stocksData.length>0) ? <StockTable stocks={ stocksData } averageData={averageData} onDelete={ onDelete } />
                : <div style={{ position:'sticky', center: "0%"}}>Add a stock to get started!</div>
        }
        <div style={{height:'30px'}}/>
        {
            (averageData.length>0) ? <AverageTable averageData={averageData}/>
                : <></>
        }
    </div>
  );
}

export default App;
