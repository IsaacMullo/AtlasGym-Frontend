import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CustomButton from '../../../common/CustomButton/CustomButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const SaleModal = ({open, onClose, onAddProduct}) =>{
  const [producto, setProducto] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [responsable, setResponsable] = useState('');

  const handleChange = (event) => {
    setProductoSeleccionado(event.target.value);
  };

  const handleSave = async () => {
    const productoDetalles = producto.find(p => p.id_producto === productoSeleccionado);
  
    if (productoDetalles) {
      try {
        const totalV = productoDetalles.precio * parseInt(cantidad);
        const ventaResponse = await axios.post('http://localhost:8000/api/historial-ventas/', {    
          id_producto: productoSeleccionado,
          cantidad,
          responsable,
          precio: totalV,
        });
  
        if (ventaResponse.status === 201) {
          const nuevoStock = productoDetalles.stock - parseInt(cantidad);
          await axios.put(`http://localhost:8000/api/productos/${productoSeleccionado}/`, {
            ...productoDetalles,
            stock: nuevoStock
          });
  
          onAddProduct({
            ...ventaResponse.data,
          });
  
          setProductoSeleccionado('');
          setCantidad('');
          setResponsable('');
          onClose();
        }
      } catch (error) {
        console.error('Error realizando la venta o actualizando el stock:', error);
      }
    };
  }
  


  const handleCancel = () => {
    setProductoSeleccionado('')
    setCantidad('');
    setResponsable('');
    onClose();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/productos/');
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const logTest =(id) =>{
    console.log(id)
  }

  return(
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Realizar venta
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Producto</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={productoSeleccionado}
                onChange={handleChange}
                autoWidth
                label="Producto"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {producto.map((productoS, index) =>
                  <MenuItem key={index} value={productoS.id_producto}>{productoS.nombre_producto}</MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField
              id="quantity"
              label="Cantidad"
              variant="standard"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              id="responsible"
              label="Responsable"
              variant="standard"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              sx={{ mb: 2, width: '100%' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <CustomButton onClick={handleCancel}>Cancelar</CustomButton>
              <CustomButton onClick={handleSave}>Confirmar</CustomButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
      </div>
)
}

export default SaleModal;