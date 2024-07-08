import axios from 'axios';
import SaleModal from "../../components/SalesComponents/SaleModal/SaleModal";
import SalesHeader from "../../components/SalesComponents/SalesHeader/SalesHeader"
import SalesTable from "../../components/SalesComponents/SalesTable/SalesTable"
import { useState, useEffect } from "react";
import "../../styles/sales.css"

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/historial-ventas/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProductToHistory = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return(
    <>
      <SalesHeader onOpenModal={() => setOpenModal(true)}/>
      <SaleModal open={openModal} onClose={() => setOpenModal(false)} onAddProduct={addProductToHistory}/>
      <SalesTable products={products}/>
    </>
  )
}
export default Sales