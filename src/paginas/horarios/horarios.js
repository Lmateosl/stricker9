import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HorariosService from './horariosService';
import BarraHorarios from '../../secciones/barraHorarios/barraHorarios';
import Mapa from '../../elementos/mapa';
import { Box, Typography, Grid} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import Calendario from '../../elementos/calendario/calendario'
import './horarios.css';

function Horarios() {
  const [titulo, setTitulo] = useState('');
  const [latitud, setLatitud] = useState(-3.998621);
  const [longitud, setLongitud] = useState(-79.202036);
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');
  const [horarioN, setHorarioN] = useState('');
  const [horarioF, setHorarioF] = useState('');
  const [campos, setCampos] = useState([]);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    console.log('ID:', id);
    HorariosService.get('getDatosCancha?position=' + id, (error, response) => {
      if (error) {
        if (error.response && error.response.body && error.response.body.error) {
          const errorMessage = error.response.body.error;
          console.log(errorMessage);
          localStorage.removeItem('token');
        } else {
          console.log('Error del servidor');
        }
      } else {
        console.log(response);
        setTitulo(response.nombre);
        setLatitud(parseFloat(response.lat));
        setLongitud(parseFloat(response.long));
        setDescripcion(response.descripcion);
        setDireccion(response.direccion);
        setCorreo(response.correo);
        setNumero(response.numero);
        setCampos(response.campos);
        setHorarioN(response.horarioN);
        setHorarioF(response.horarioF);
      }
    });
  }, [id]);

  return (
    <div>
      <BarraHorarios titulo={titulo} />
      <div className='barraNegra'></div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Grid container spacing={2} style={{paddingTop: "106px", zIndex: '10', position: 'relative', marginBottom: '65px'}}>
          <Grid item xs={12} lg={12} className="primerGrid">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              marginBottom={{lg: '20px'}}
              marginTop={{lg: '20px'}}
            >
              <Box 
                width={{xs: '100%', lg: '70%'}}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  bgcolor="#1f1f1f"
                  borderRadius={8}
                  boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                  width={{xs: "calc(100% - 24px)", lg: "80%"}}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  p={3}
                  margin={0}
                  boxSizing="border-box"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} >
                      <Mapa
                        latitud={latitud}
                        longitud={longitud}
                        zoom={17}
                        containerElement={<div style={{ width: '100%', height: '200px' }} />}
                        mapElement={<div style={{ height: '100%', width: '100%', borderRadius: '8px' }} />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Box width="100%" textAlign="center" mt={2} marginTop={{xs: '0px', lg: '20px'}}>
                        <Typography variant="body1" component="span" color="white" fontWeight="bold">
                          {`"${descripcion}"`}
                        </Typography>
                      </Box>
                      <Box mt={2} textAlign={{lg: 'center'}}>
                        <Typography variant="body1" component="p" color="white">
                          Dirección: {direccion}
                        </Typography>
                        <Typography variant="body1" component="p" color="white">
                          Correo: {correo}
                        </Typography>
                        <Typography variant="body1" component="p" color="white">
                          Número: {numero}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12} className="segundoGrid">
            <Box
              display="flex"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <Box width={{xs: '100%', lg: '80%'}}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  {campos.map((campo, index) => (
                    <Grid item xs={12} lg={4} key={index}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        height="100%"
                        width="100%"
                        marginTop={0}
                      >
                        <Box
                          bgcolor="#1f1f1f"
                          borderRadius={8}
                          boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                          width={{ xs: "calc(100% - 24px)", lg: "calc(100% - 24px)" }}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          p={3}
                          margin={0}
                          boxSizing="border-box"
                        >
                          <Typography variant="h6" component="h3" color="white" fontWeight="bold" marginBottom="5px">
                            Campo {index + 1}
                          </Typography>
                          <Carousel showThumbs={false} infiniteLoop={true} showArrows={false} showStatus={false}>
                            {campo.imgs.map((img, imgIndex) => (
                              <div key={imgIndex}>
                                <img
                                  src={img}
                                  alt={`Campo ${index + 1} - Imagen ${imgIndex + 1}`}
                                  style={{height: '150px', borderRadius: '8px' }}
                                  className="imgCarrusel"
                                />
                              </div>
                            ))}
                          </Carousel>
                          <Typography component="h3" color="white" marginBottom="5px" marginTop="10px">
                            Precio: ${campo.precio} / hora
                          </Typography>
                          <Typography variant="h6" component="h3" color="white" fontWeight="bold" marginBottom="0px" marginTop="10px">
                            Elige una fecha y horario
                          </Typography>
                          <Calendario campo={campo} horarioN={horarioN} horarioF={horarioF} idCancha={id} nombreCancha={titulo} numeroCancha={numero}/>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Horarios;
