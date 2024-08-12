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

const SalesHistoryTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  function convertUTCDateToLocalDate(dateString) {
    const date = new Date(dateString);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace('T', ' ').substring(0, 19);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://atlasgym-backend-production.up.railway.app/api/historial-ventas/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const labelDisplayedRows = ({ from, to, count }) => {
    return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300}} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Nro. de Venta</TableCell>
              <TableCell sx={{ fontWeight: 'bold', paddingLeft: '10%'}}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Producto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Cantidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Responsable</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.id_venta}</TableCell>
                <TableCell sx={{paddingLeft: '6%'}} component="th" scope="row">{convertUTCDateToLocalDate(row.fecha)}</TableCell>
                <TableCell align="center">{(row.nombre_producto)}</TableCell>
                <TableCell align="center">{row.cantidad}</TableCell>
                <TableCell align="center">{row.responsable}</TableCell>
                <TableCell align="center">{"$" + row.precio}</TableCell>
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
                rowsPerPageOptions={[7, 10, 25, { label: 'Todos', value: -1 }]}
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
      </TableContainer>
    </>
  );
}

export default SalesHistoryTable