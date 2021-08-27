import { useState } from 'react'

const AddStock =({ onAdd })=> {
    const [ticker, setTicker] = useState('')
    const onSubmit = (e) =>{
        e.preventDefault()
        if (!ticker){
            alert('Please use text')
            return
        }
        if(ticker.length>4){
            alert('Ticker must be less than 4 characters')
        }
        onAdd (ticker.toUpperCase())
        setTicker('')
    }
    return(
        <form onSubmit={ onSubmit } style={{ height:'auto', padding:'30px', display:'flex' }}>
            <div>
                <label></label>
                <input style={{ fontSize:'large'}} type='text' placeholder='Add Ticker'
                       value={ ticker }
                       onChange={( e) => setTicker(e.target.value) }/>
            </div>
            <div>
                <input style={{ fontSize:'large'}} type='submit' value='Add'/>
            </div>
        </form>
    );
}

export default AddStock