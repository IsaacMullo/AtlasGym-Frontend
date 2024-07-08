import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import UseNavigation from '../../hooks/UseNavigate/UseNavigate';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useAuth(); 
  const goTo = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login({ nombre_usuario: usuario, clave: clave });
    if (success) {
        goTo("/sales");  // Redirige a la ruta /stock si el login es exitoso
    }
};


  return(
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '80vh', mt: 8 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("src/assets/images/logo.jpg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ mt: 10, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicio de Sesion
            </Typography>
            <Box component="form" noValidate sx={{ mt: 8 }}  onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="usuario"
                autoFocus
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="clave"
                label="Contraseña"
                type="clave"
                id="clave"
                autoComplete="clave"
                value={clave}
                onChange={e => setClave(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 7, mb: 2 }}
              >
                Ingresar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default Login;