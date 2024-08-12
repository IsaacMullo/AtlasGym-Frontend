import SalesHistoryHeader from "../../components/SalesHistoryComponents/SalesHistoryHeader/SalesHistoryHeader"
import SalesHistoryTable from "../../components/SalesHistoryComponents/SalesHistoryTable/SalesHistoryTable"
import '../../styles/sales-history.css';


const SalesHistory = () =>{
 return(
  <>
    <SalesHistoryHeader/>
    <SalesHistoryTable/>
  </>
 )
}

export default SalesHistory