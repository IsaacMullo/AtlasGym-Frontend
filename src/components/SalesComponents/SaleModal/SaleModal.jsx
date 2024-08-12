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
import { useAuth } from '../../../contexts/AuthContext/AuthContext';

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
  const [nombreProducto, setNombreProducto] = useState('');
  const { user } = useAuth();
  
  const [responsable, setResponsable] = useState(user ? user.nombre_usuario : '');

  useEffect(() => {
    if (user) {
      setResponsable(user.nombre_usuario);
    }
  }, [user]);

  const handleChange = (event) => {
    setProductoSeleccionado(event.target.value);
  };

  const handleSave = async () => {
    const productoDetalles = producto.find(p => p.id_producto === productoSeleccionado);
  
    if (productoDetalles) {
      const totalV = productoDetalles.precio * parseInt(cantidad);
  
      if (productoDetalles.stock >= cantidad) {
        try {
          const ventaResponse = await axios.post('https://atlasgym-backend-production.up.railway.app/api/historial-ventas/', {
            id_producto: productoSeleccionado,
            cantidad,
            responsable,
            precio: totalV,
          });
  
          if (ventaResponse.status === 201) {
            const nuevoStock = productoDetalles.stock - parseInt(cantidad);
            await axios.put(`https://atlasgym-backend-production.up.railway.app/api/productos/${productoSeleccionado}/`, {
              ...productoDetalles,
              stock: nuevoStock
            });
  
            onAddProduct({
              ...ventaResponse.data,
            });
            
            if (user && user.id_usuario) {
              await registrarUsuarioVenta(user.id_usuario, ventaResponse.data.id_venta);
            }

            setProductoSeleccionado('');
            setCantidad('');
            setResponsable('');
            setNombreProducto('');
            onClose();
          }
        } catch (error) {
          console.error('Error realizando la venta o actualizando el stock:', error);
        }
      } else {
        alert(`No hay suficiente stock. Stock disponible: ${productoDetalles.stock}`);
      }
    } else {
      alert("Producto no encontrado.");
    }
  };
  
  

  const handleCancel = () => {
    setProductoSeleccionado('')
    setCantidad('');
    setResponsable('');
    onClose();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://atlasgym-backend-production.up.railway.app/api/productos/');
        setProducto(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



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
              type="text"
              value={cantidad}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 1) {
                  value = parseInt(value, 10).toString();
                }
                setCantidad(value.replace(/[^0-9]/g, ''));
              }}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              id="responsible"
              label="Responsable"
              variant="standard"
              disabled
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

const registrarUsuarioVenta = async (id_usuario, id_ventas) => {
  try {
    await axios.post('https://atlasgym-backend-production.up.railway.app/api/usuario-ventas/', {
      id_usuario,
      id_ventas
    });
    console.log('Relación usuario-venta registrada correctamente');
  } catch (error) {
    console.error('Error al registrar la relación usuario-venta:', error);
  }
};

export default SaleModal;