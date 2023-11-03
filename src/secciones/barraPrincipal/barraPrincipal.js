import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import './barraPrincipal.css'
import logo from '../../img/logoVerdeFondoNegro.png';

function BarraPrincipal() {
    return (
        <AppBar position="fixed">
          <Toolbar className='barraFondo'>
            <Box flexGrow={1} display="flex" justifyContent="center">
              {/* Aquí puedes colocar tu logotipo */}
              <img src={logo} id="imagenLogo" alt='logo'/>
            </Box>
          </Toolbar>
        </AppBar>
      );
}

export default BarraPrincipal