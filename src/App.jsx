import {Routes, Route } from 'react-router-dom';



import './App.css'
import StockManage from './pages/StockManage/StockManage'
import SalesHistory from './pages/SalesHistory/SalesHistory';
import Sales from './pages/Sales/Sales';

function App() {

  return (
    <>
      <Routes>
        <Route path={"/stock"} element={<StockManage/>}/>
        <Route path={"/history"} element={<SalesHistory/>}/>
        <Route path={"/sales"} element={<Sales/>}/>
      </Routes>
    </>
  )
}

export default App