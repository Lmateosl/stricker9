import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import './singin.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupService from './SignupService';

function Singin() {
  const [loading, setLoading] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [getCodigo, setGetCodigo] = useState('');
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCedulaChange = (event) => {
    const { value } = event.target;
    // Eliminar caracteres no numéricos
    const newValue = value.replace(/\D/g, '');
    // Limitar la longitud de la cédula a 10 dígitos
    const trimmedValue = newValue.slice(0, 10);
    setCedula(trimmedValue);
  };

  const handleNumeroChange = (event) => {
    const input = event.target.value;
    // Verificar si el input comienza con "+593"
    if (input.startsWith('+593')) {
      setNumero(input);
    } else {
      setNumero('+593' + input);
    }
  };
  const handleKeyDown = (event) => {
    // Evitar borrar "+593"
    if (event.target.value === '+593' && event.key === 'Backspace') {
      event.preventDefault();
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (password.length < 7) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      if (password === event.target.value) {
          setRePasswordError(false);
      } else {
          setErrorMessage('Las contraseñas no coinciden.');
          setRePasswordError(true);
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length > 7) {
      if (password === confirmPassword) {
        setLoading(true); // Activar el estado de carga

        const data = {numero: numero};

        SignupService.postCodigo('codigo', data, (error, response) => {
          setLoading(false);
    
          if (error) {
            if (error.response && error.response.body && error.response.body.error) {
              const errorMessage = error.response.body.error;
              console.log(errorMessage);
              toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER
              });
            } else {
              toast.error('Error de servidor', {
                position: toast.POSITION.TOP_CENTER
              });
            }
          } else {
            console.log(response);
            setGetCodigo(response.codigo);
            setOpen(false);
          }
        });

      } else {
        toast.error("Las contraseñas no coinciden.", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } else {
      toast.error("La contraseña debe tener 8 digitos o más.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleSubmitModal = (event) => {

    if (getCodigo === codigo) {
      setLoadingModal(true);

      const userData = {
        nombre: name,
        cedula: cedula,
        telefono: numero,
        mail: email,
        contrasena: password,
        reservas: []
      }

      console.log(userData);
      SignupService.postSingin('signup', userData, (error, data) => {
        if (error) {
          setOpen(true);
          if (error.response && error.response.body && error.response.body.error) {
            setLoadingModal(false);
            const errorMessage = error.response.body.error;
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_CENTER
            });
          } else {
            setLoadingModal(false);
            toast.error('Error de servidor', {
              position: toast.POSITION.TOP_CENTER
            });
          }
          setLoadingModal(false);
          setOpen(true);
        } else {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER
          });
          window.localStorage.setItem('token', data.token);
          setLoadingModal(false);
          setOpen(true);
          setRedirectToHome(true);
        }
      });
    } else {
      toast.error('El código no es correcto.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  
  }

  const handleBack = () => {
    setOpen(true);
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
      {open ?
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
              Únete ahora
          </Typography>
          <form onSubmit={handleSubmit} className="formStyle">
            <Box mb={2}>
              <TextField
                label="Nombre"
                type="text"
                value={name}
                onChange={handleNameChange}
                fullWidth
                required
                InputLabelProps={{
                  style: { color: 'white' },
                }}
                inputProps={{
                  style: { color: 'white' },
                }}
                focused
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                  label="Cédula"
                  type="text"
                  value={cedula}
                  onChange={handleCedulaChange}
                  fullWidth
                  required
                  error={cedula.length !== 10} // Mostrar error si la longitud no es igual a 10
                  helperText={cedula.length !== 10 ? 'La cédula debe tener 10 dígitos' : ''}
                  InputLabelProps={{
                  style: { color: 'white' },
                  }}
                  inputProps={{
                    maxLength: 10,
                    style: { color: 'white' },
                  }}
                  focused
                  sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                  },
                  }}
              />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Número"
                  type="text"
                  value={numero}
                  onChange={handleNumeroChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  required
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                  inputProps={{
                    style: { color: 'white' },
                    maxLength: 13,
                  }}
                  focused
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                />
              </Box>
              <Box mb={2}>
              <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  required
                  InputLabelProps={{
                  style: { color: 'white' },
                  }}
                  inputProps={{
                  style: { color: 'white' },
                  }}
                  focused
                  sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                  },
                  }}
              />
              </Box>
              <Box mb={2}>
              <TextField
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  required
                  InputLabelProps={{
                  style: { color: 'white' },
                  }}
                  inputProps={{
                  style: { color: 'white' },
                  }}
                  focused
                  sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                  },
                  }}
              />
              <Typography
                  variant="body2"
                  color="error"
                  align="left"
                  style={{ marginTop: '2px', fontSize: '10px', visibility: passwordError ? 'visible' : 'hidden' }}
                  >
                  {errorMessage}
              </Typography>
              </Box>
              <Box mb={2}>
              <TextField
                  label="Reingresar Contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  fullWidth
                  required
                  InputLabelProps={{
                  style: { color: 'white' },
                  }}
                  inputProps={{
                  style: { color: 'white' },
                  }}
                  focused
                  sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                  },
                  }}
              />
              <Typography
                  variant="body2"
                  color="error"
                  align="left"
                  style={{ marginTop: '2px', fontSize: '10px', visibility: rePasswordError ? 'visible' : 'hidden' }}
                  >
                  {errorMessage}
              </Typography>
              </Box>
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#79ff53', color: 'white', width: '100%'}} disabled={loading}>
                  {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Signup'}
              </Button>
              <Typography variant="body1" style={{ marginTop: '30px', color: '#79ff53', textAlign: 'center', fontSize: '13px'}}>
                ¿Ya tienes una cuenta?{' '}
                <NavLink to="/login" style={{ color: '#79ff53' }}>
                  Da click aquí ingresar.
                </NavLink>
                .
              </Typography>
          </form>
        </Box>
        :
        <Box
        sx={{
          backgroundColor: '#1f1f1f',
          height: '100%',
          width: '40%',
          '@media (max-width: 600px)': {
            width: '80%',
          },
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          padding: '16px',
        }}
        >
          <p style={{ color: 'white', textAlign: 'center' }}>Te enviamos un código a tu WhatsApp, ingrésalo aquí:</p>
          <TextField
            label="Código"
            variant="outlined"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: { color: 'white' },
            }}
            inputProps={{
              style: { color: 'white' },
            }}
            focused
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitModal}
            disabled={loadingModal}
            fullWidth
            style={{ backgroundColor: '#79ff53', color: 'white', marginTop: '16px', borderRadius: '8px' }}
          >
            {loadingModal ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Signup'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            fullWidth
            style={{ backgroundColor: '#1f1f1f', color: '#79ff53', marginTop: '16px', borderRadius: '8px', border: '1px solid #79ff53' }}
          >
            Atrás
          </Button>
        </Box>
      }
    </Box>
  );
}

export default Singin;
