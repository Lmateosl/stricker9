import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Backdrop } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import LoginService from './loginService';

function Login() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleResetPassword = () => {
    const userData = {email: email};

    if (email) {
      setOpen(true);
      LoginService.postLogin('pass', userData, (error, data) => {
        console.log(error);
        if (error) {
          setOpen(false);
          if (error.response && error.response.body && error.response.body.error) {
            const errorMessage = error.response.body.error;
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_CENTER
            });
          } else {
            toast.error('Error de servidor', {
              position: toast.POSITION.TOP_CENTER
            });
          }
          setLoading(false);
        } else {
          setOpen(false);
          console.log('Respuesta de la petición POST:', data);
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER
          });
          setLoading(false);
        }
      });
    } else {
      toast.error('Ingresa tu correo electrónico, ahí podrás restablecer tu contraseña.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Activar el estado de carga

    const userData = {
      email: email,
      password: password
    }
    console.log(userData);

    LoginService.postLogin('login', userData, (error, data) => {
      console.log(error);
      if (error) {
        if (error.response && error.response.body && error.response.body.error) {
          const errorMessage = error.response.body.error;
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.error('Error de servidor', {
            position: toast.POSITION.TOP_CENTER
          });
        }
        setLoading(false);
      } else {
        console.log('Respuesta de la petición POST:', data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        window.localStorage.setItem('token', data.token);
        setLoading(false);
        setRedirectToHome(true);
      }
    });
    
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        maxWidth={{xs: '80%', md: '60%', lg: '40%'}} // Ancho máximo del recuadro
        width="100%" // Asegura que el recuadro ocupe el 100% del ancho disponible
        p={3} // Espaciado interno
        borderRadius="10px" // Borde redondeado
        bgcolor="#1f1f1f" // Fondo negro
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)" // Sombra
        margin="0 auto" // Centra el recuadro horizontalmente
      >
        <Typography variant="h4" color="white" textAlign="center" marginBottom="20px" gutterBottom>
          Adelante, entra
        </Typography>
        <form onSubmit={handleSubmit} className="formStyle">
            <Box mb={2}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      style: { color: 'white' }, // Color del label blanco
                    }}
                    inputProps={{
                      style: { color: 'white' }, // Color del texto blanco
                    }}
                    focused
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Borde blanco en enfoque (focus)
                      },
                    }}
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    required
                                        InputLabelProps={{
                      style: { color: 'white' }, // Color del label blanco
                    }}
                    inputProps={{
                      style: { color: 'white' }, // Color del texto blanco
                    }}
                    focused
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Borde blanco en enfoque (focus)
                      },
                    }}
                />
            </Box>
            <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#79ff53', color: 'white', width: '100%'}} disabled={loading}>
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
            </Button>
            <Typography
              variant="body1"
              onClick={handleResetPassword}
              style={{ cursor: 'pointer', color: '#79ff53', textAlign: 'center', fontSize: '13px', marginTop: '10px' }}
            >
              ¿Olvidaste tu contraseña? Recupérala aquí.
            </Typography>
            <Backdrop open={open} style={{zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>        
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p style={{fontSize: '18px', color: 'white', textAlign: 'center'}}>Enviado correo de verificación a {email}</p>
                <CircularProgress style={{ color: '#79ff53' }} />
              </div>
            </Backdrop>
            <Typography variant="body1" style={{ marginTop: '30px', color: '#79ff53', textAlign: 'center', fontSize: '13px'}}>
              ¿Aún no tienes una cuenta?{' '}
              <NavLink to="/signup" style={{ color: '#79ff53' }}>
                Da click aquí para crearla
              </NavLink>
              .
            </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
