import * as React from 'react';
import { useEffect } from 'react';
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

export default function EditModal({ open, onClose, onEditProduct, editingProduct}) {
  const [product, setProduct] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [stock, setStock] = React.useState('');

  useEffect(() => {
    if (open && editingProduct) {
      setProduct(editingProduct.nombre_producto);
      setPrice(editingProduct.precio)
      setStock(editingProduct.stock);
    }
  }, [open, editingProduct]);

  const handleEdit = () => {
    if (!editingProduct) return;
    onEditProduct({
      id_producto: editingProduct.id_producto,
      nombre_producto: product,
      precio: parseFloat(price),
      stock: parseInt(stock),
    });
    setProduct('');
    setPrice('');
    setStock('');
    onClose();
  };

  const handleCancel = () => {
    setProduct('');
    setPrice('');
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
              Editar Producto
            </Typography>
            <TextField
              id="product-name"
              label="Producto"
              variant="standard"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              id="product-price"
              label="Precio"
              variant="standard"
              type="text"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                const isValidInput = value === "" || (/^\d*\.?\d*$/.test(value));
                if (isValidInput) {
                  setPrice(value.replace(/^0+/, '0')
                                         .replace(/\.+/, '.')
                                         .replace(/(^\.)|(\..*\.)|^0(\d+)/g, '$2$3'));
                }
              }}
              onBlur={() => {
                if (price && !isNaN(price)) {
                  setPrice(parseFloat(price).toFixed(2));
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
              <CustomButton onClick={handleEdit}>Guardar</CustomButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
