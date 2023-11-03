import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Divider } from '@mui/material';
import './profile.css';
import { clearUser } from '../../states/stateSlice';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector((state) => state.user); // Accede al estado global del usuario

  const [isLoading, setIsLoading] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      setRedirectToHome(true);
    }
  },[]);

  const handleButtonClick = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      window.localStorage.removeItem('token');
      dispatch(clearUser());
      setRedirectToHome(true);
    }, 2000);
  };

  if (redirectToHome) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box className="profileBox" >
        <Avatar className="avatar" />
        <Typography className="letters" variant="h5" align="center">
          Informacion de tu cuenta
        </Typography>
        <Divider
          style={{
            width: '80%',
            backgroundColor: '#79ff53',
            margin: '16px auto',
          }}
        />
        <Typography className="letters" variant="h6" align="center">
          Nombre: {user.nombre}
        </Typography>
        <Typography className="letters" variant="body1" align="center">
          Email: {user.mail}
        </Typography>
        <Typography className="letters" variant="body1" align="center">
          Cédula: {user.cedula}
        </Typography>
        <Typography className="letters" variant="body1" align="center">
          Teléfono: {user.telefono}
        </Typography>
        <Button
          className="button"
          variant="contained"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Cerrar Sesión'}
        </Button>
      </Box>
    </Box>
  );
  
  
};

export default Profile;

