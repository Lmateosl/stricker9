import React from 'react';
import './barraHorarios.css';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function barraHorarios({ titulo }) {
    return (
    <div>
        <div className="barra">
        <IconButton
            component={Link}
            to="/"
            color="inherit"
            aria-label="Volver"
            style={{ position: 'absolute', left: '16px', color: 'white', fontSize: '16px'}}
        >
            <ArrowBackIcon />
        </IconButton>
        <h1 className="titulo">{titulo}</h1>
        </div>
        {/* Resto del contenido del componente Horarios */}
    </div>
    );
}

export default barraHorarios;
