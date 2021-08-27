import {FaTimes} from "react-icons/all";

const DeleteButton =({ show, stock, onDelete })=>{

    return (
        <>
            {
                 (show) ? <FaTimes style={{ color:'red', cursor: 'pointer' }} onClick={ () => onDelete(stock) }/> : <></>
            }
        </>



    )}
export default DeleteButton