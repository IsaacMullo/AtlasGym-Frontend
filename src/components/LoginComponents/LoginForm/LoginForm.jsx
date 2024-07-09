import React from 'react';
import { Button, TextField, Box } from '@mui/material';

const LoginForm = ({ usuario, setUsuario, clave, setClave, onSubmit }) => {
    return (
        <Box component="form" noValidate sx={{ mt: 8 }} onSubmit={(e) => { e.preventDefault(); onSubmit(usuario, clave); }}>
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
                type="password" 
                id="clave"
                autoComplete="current-password"
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
    );
};

export default LoginForm;
