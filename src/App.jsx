import {Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import StockManage from './pages/StockManage/StockManage'
import SalesHistory from './pages/SalesHistory/SalesHistory';
import Sales from './pages/Sales/Sales';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/stock" element={<StockManage />} />
          <Route path="/history" element={<SalesHistory />} />
        </Route>
        <Route element={<ProtectedRoute roles={['admin', 'employee']} />}>
          <Route path="/sales" element={<Sales />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App