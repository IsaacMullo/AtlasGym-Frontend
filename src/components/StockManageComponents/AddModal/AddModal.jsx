import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CustomButton from '../../../common/CustomButton/CustomButton';

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

export default function AddModal({ open, onClose, onAddProduct }) {
  const [nombre_producto, setNombreProducto] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [stock, setStock] = React.useState('');

  const handleSave = () => {
    onAddProduct({
      nombre_producto: nombre_producto,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    });
    setNombreProducto('');
    setPrecio('');
    setStock('');
    onClose();
  };

  const handleCancel = () => {
    setNombreProducto('');
    setPrecio('');
    setStock('');
    onClose();
  }

  return (
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
              Agregar Producto
            </Typography>
            <TextField
              id="product-name"
              label="Producto"
              variant="standard"
              value={nombre_producto}
              onChange={(e) => setNombreProducto(e.target.value)}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              id="product-price"
              label="Precio"
              variant="standard"
              type="text"
              value={precio}
              onChange={(e) => {
                const value = e.target.value;
                const isValidInput = value === "" || (/^\d*\.?\d*$/.test(value));
                if (isValidInput) {
                  setPrecio(value.replace(/^0+/, '0')
                                         .replace(/\.+/, '.')
                                         .replace(/(^\.)|(\..*\.)|^0(\d+)/g, '$2$3'));
                }
              }}
              onBlur={() => {
                if (precio && !isNaN(precio)) {
                  setPrecio(parseFloat(precio).toFixed(2));
                }
              }}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              id="product-stock"
              label="Stock"
              variant="standard"
              type="text"
              value={stock}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 1) {
                  value = parseInt(value, 10).toString();
                }
                setStock(value.replace(/[^0-9]/g, ''));
              }}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ mb: 2, width: '100%' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <CustomButton onClick={handleCancel}>Cancelar</CustomButton>
              <CustomButton onClick={handleSave}>Guardar</CustomButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
