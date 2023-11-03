import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TokenChecker from '../../user/tokenChecker';
import HomeService from './homeService';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './home.css';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reHorarios, setReHorarios] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [idCancha, setIdCancha] = useState('');

  useEffect(() => {
    setLoading(true);
    HomeService.get('getCanchas', (error, response) => {
      setLoading(false);

      if (error) {
        setError(true);
        if (error.response && error.response.body && error.response.body.error) {
          const errorMessage = error.response.body.error;
          console.log(errorMessage);
          localStorage.removeItem('token');
        } else {
          console.log('Error del servidor');
        }
      } else {
        console.log(response);
        setData(response);
      }
    });
  }, []);


  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleHorariosButtonClick = (id) => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      setError(true);
    } else {
      setIdCancha('/horarios?id=' + id);
      setReHorarios(true);
    }
  };
  

  if (error) {
    return <Navigate to="/login" />;
  }

  if (reHorarios) {
    return <Navigate to={idCancha} />;
  }

  // Filtrar los elementos de datos según el searchText
  const filteredData = data.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    item.direccion.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      minHeight="calc(100vh - 100px)"
      bgcolor="transparent"
      marginTop={{ xs: '80px', lg: '110px' }}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth={{ xs: '100%', lg: '60%' }}
        p={2}
        bgcolor="transparent"
      >
        <TextField
          label="¿Dónde quieres jugar?"
          margin="dense"
          variant="outlined"
          className='autocomplete-root'
          InputLabelProps={{
            classes: {
              root: 'autocomplete-label',
              focused: 'Mui-focused autocomplete-label',
            },
          }}
          InputProps={{
            classes: {
              root: 'autocomplete-outlinedInput',
              focused: 'Mui-focused autocomplete-outlinedInput',
              notchedOutline: 'MuiOutlinedInput-notchedOutline',
            },
          }}
          value={searchText}
          onChange={handleSearchChange}
        />
        {loading ? (
          <div style={{marginTop: "20px"}}>
            <Skeleton variant="rectangular" width="357px" height="142px" style={{borderRadius: '10px'}}/>
            <Skeleton variant="rectangular" width="357px" height="142px" style={{marginTop: "20px", borderRadius: '10px'}}/>
            <Skeleton variant="rectangular" width="357px" height="142px" style={{marginTop: "20px", borderRadius: '10px'}}/>
            <Skeleton variant="rectangular" width="357px" height="142px" style={{marginTop: "20px", borderRadius: '10px'}}/>
          </div>
        ) : (
          <Box
            maxHeight="calc(100vh - 235px)"
            overflowy="auto"
            marginTop={{xs: "10px", lg: "20px"}}
            width="100%"
            className="overFlow"
          >
            {filteredData.length > 0 ? (
              <Grid container spacing={1}>
              {filteredData.map((item) => (
                <Grid item xs={12} lg={6} key={item.id}>
                  <Box
                    bgcolor="#1f1f1f"
                    borderRadius={5}
                    boxShadow="0 0 5px rgba(0, 0, 0, 0.5)" // Sombra
                    padding={2}
                    marginBottom={1}
                    width="325px"
                    height="110px"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                      >
                        <img src={item.imgInicio} alt="Imagen" style={{ width: '132px', height: '78px', borderRadius: '10px' }} />
                      </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Box style={{color: 'white'}}>
                            <strong style={{textAlign: 'center'}}>{item.nombre}</strong>
                          </Box>
                          <Box style={{color: 'white'}}>
                            <p style={{fontSize: '10px'}}>{item.direccion}</p>
                          </Box>
                          <Box mt={2}>
                            <Button
                              variant="contained"
                              color="success"
                              fullWidth
                              style={{ backgroundColor: '#79ff53', color: 'white' }}
                              onClick={() => handleHorariosButtonClick(item.id)}
                            >
                              Reservar
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '40px', color: '#ffffff', fontSize: '20px' }}>
                Lo sentimos, no encontramos lo que estás buscando :(
              </div>
            )}
          </Box>
        )}
      </Box>
      <TokenChecker />
    </Box>
  );
}

export default Home;

