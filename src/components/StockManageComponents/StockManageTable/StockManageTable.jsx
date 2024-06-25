import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import CreateIcon from '@mui/icons-material/Create';
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import StockManageHeader from '../StockManageHeader/StockManageHeader';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function StockManageTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  


  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenDeleteModal = (id_producto) => {
    setCurrentProductId(id_producto);
    console.log(id_producto)

    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCurrentProductId(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const onAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:8000/api/productos/', newProduct);
      setProducts(prevProducts => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const onEditProduct = async (producto) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/productos/${producto.id_producto}/`, producto);
      setProducts(products.map(product => 
        product.id_producto === producto.id_producto ? response.data : product
      ));
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  const onDeleteProduct = async (id_producto) => {
    try {
      await axios.delete(`http://localhost:8000/api/productos/${id_producto}/`);
      setProducts(products.filter(product => product.id_producto !== id_producto)); // Actualizar el estado filtrando el producto eliminado
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const logTest =(pos) =>{
    return pos + 1
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const labelDisplayedRows = ({ from, to, count }) => {
    return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
  };

  return (
    <>
    <StockManageHeader onAddProduct={onAddProduct} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Producto</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Precio</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Stock</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell component="th" scope="row" align="center">{row.nombre_producto}</TableCell>
              <TableCell align="right">{"$" + row.precio}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{"$" + (row.precio * row.stock).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" onClick={() => handleOpenEditModal(row)}>
                  <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleOpenDeleteModal(row.id_producto)}>
                  <DeleteForeverSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6, 10, 25, { label: 'Todos', value: -1 }]}
              colSpan={0}
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  native: true,
                },
              }}
              labelRowsPerPage="Registros:"
              labelDisplayedRows={labelDisplayedRows}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <EditModal open={editModalOpen} onClose={handleCloseEditModal} onEditProduct={onEditProduct} editingProduct={editingProduct}/>
      <DeleteModal open={deleteModalOpen} onClose={handleCloseDeleteModal} onDeleteProduct={onDeleteProduct} id_producto={currentProductId}/>
    </TableContainer>
    </>
  );
}
