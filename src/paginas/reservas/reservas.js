import React, { useEffect, useState } from 'react';
import ReservasService from './reservasService';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import { Box, Button, Backdrop, CircularProgress, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reservas () {  
    const user = useSelector((state) => state.user); // Accede al estado global del usuario

    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idCancha, setIdCancha] = useState('');
    const [reHorarios, setReHorarios] = useState(false);
    const [abrirCancelar, setAbrirCancelar] = useState(false);
    const [diaCancelar, setDiaCancelar] = useState('');
    const [horaCancelar, setHoraCancelar] = useState('');
    const [cancelar, setCancelar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cambio, setCambio] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        // Petición POST 'reservasUsuario'
        ReservasService.getRervas('reservasUsuario', {numero: user.telefono}, (error, data) => {
            if (error) {
                console.log(error);
                if (error.response && error.response.body && error.response.body.error) {
                    const errorMessage = error.response.body.error;
                    console.log(errorMessage);
                } else {
                    console.log('Error del servidor');
                }
            } else {
                // Petición GET 'horaGuayaquil'
                ReservasService.getHora('horaGuayaquil', (error, dato) => {
                    if (error) {
                        console.log(error);
                        if (error.response && error.response.body && error.response.body.error) {
                            const errorMessage = error.response.body.error;
                            console.log(errorMessage);
                        } else {
                            console.log('Error del servidor');
                        }
                    } else {
                        const actualDate = new Date(dato.fechaGuayaquil);
                        const newTimeArray = dato.horaGuayaquil.split(':');
                        const actualTime = parseInt(newTimeArray[0]);
                        const delateReservs = [];
                        const newArrayReservs = [];
                        data.forEach(date => {
                            const dateReserv = new Date(date.fecha);
                            console.log(dateReserv, actualDate);
                            console.log(date.hora, actualTime);
                            if (dateReserv > actualDate) {
                                date.cancelar = true;
                                newArrayReservs.push(date);  
                            } else if (date.fecha === dato.fechaGuayaquil && date.hora > actualTime) {
                                const umbral = date.hora - actualTime;
                                if (umbral > 2) {
                                    date.cancelar = true;
                                    newArrayReservs.push(date);  
                                } else {
                                    date.cancelar = false;
                                    newArrayReservs.push(date);  
                                }
                            } else {
                                delateReservs.push(date.id);
                            }
                        });
                        if (delateReservs.length > 0) {
                            ReservasService.postEliminarReserva('reservasPasadas', delateReservs,(error, confir) => {
                                if (error) {
                                    console.log(error);
                                    if (error.response && error.response.body && error.response.body.error) {
                                        const errorMessage = error.response.body.error;
                                        console.log(errorMessage);
                                    } else {
                                        console.log('Error del servidor');
                                    }
                                } else {
                                    console.log('Respuesta de la petición POST de eliminar reservas:', confir);
                                    setReservas(newArrayReservs);
                                    setIsLoading(false);
                                }
                            });
                        } else {
                            setReservas(newArrayReservs);
                            setIsLoading(false);
                        }
                        console.log(newArrayReservs);
                        console.log(delateReservs);
                    }
                });
            }
        });
    }, [user.telefono, cambio]);

    const handleHorariosButtonClick = (id) => {
          setIdCancha('/horarios?id=' + id);
          setReHorarios(true);
    };

    const abriCancelarRerva = (dia, hora, id) => {
        setDiaCancelar(dia)
        setHoraCancelar(hora)
        setCancelar([id])
        setAbrirCancelar(true)
    }

    const handleClose = () => {
        //Funcion para cerrar el modal
        setAbrirCancelar(false);
    };

    const handleConfirm = () => {
        setLoading(true);

        ReservasService.postEliminarReserva('reservasPasadas', cancelar,(error, confir) => {
            if (error) {
                console.log(error);
                if (error.response && error.response.body && error.response.body.error) {
                    const errorMessage = error.response.body.error;
                    console.log(errorMessage);
                    toast.error('Error de servidor', {
                        position: toast.POSITION.TOP_CENTER
                    });
                } else {
                    console.log('Error del servidor');
                    toast.error('Error de servidor', {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            } else {
                console.log('Respuesta de la petición POST de eliminar reservas:', confir);
                setLoading(false);
                setAbrirCancelar(false);
                setCambio(cambio + 1);
                toast.success(confir.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        });
    };

    if (reHorarios) {
        return <Navigate to={idCancha} />;
    }

    return (
        <Box
            bgcolor="transparent"
            width="100%"
            margin="0px"
            marginTop={{ xs: '100px', lg: '130px' }}
        >
            <Box
                bgcolor="#1f1f1f"
                borderRadius={5}
                boxShadow="0 0 5px rgba(0, 0, 0, 0.5)" // Sombra
                padding={2}
                marginBottom={1}
                marginTop="0px"
                width={{xs: '80%', lg: '40%'}}
                margin="auto"
                color="#fff"
            >
                <p style={{textAlign: "center", margin: '0', fontSize: '21px'}}>Reservas</p>
        </Box>
        {isLoading ? (
            <div style={{marginTop: "20px", margin: "auto"}}>
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
                <Grid container spacing={1}>
                    {reservas.map((item) => (
                        <Grid 
                            item xs={12} lg={6} 
                            key={item.id}  
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box
                            bgcolor="#1f1f1f"
                            borderRadius={5}
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.5)" // Sombra
                            padding={2}
                            marginBottom={1}
                            width="325px"
                            height="180px"
                            >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                    >
                                        <Box style={{color: 'white'}}>
                                            <strong 
                                                onClick={() => handleHorariosButtonClick(item.idCancha)} 
                                                style={{textAlign: 'center'}}>
                                                    {item.nombreCancha}
                                            </strong>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Box style={{color: 'white'}}>
                                            <p style={{fontSize: '12px'}}>Fecha: {item.fecha}</p>
                                        </Box>
                                        <Box style={{color: 'white'}}>
                                            <p style={{fontSize: '12px'}}>Hora: {item.hora}</p>
                                        </Box>
                                        <Box style={{color: 'white'}}>
                                            <p style={{fontSize: '12px'}}>Campo#: {parseInt(item.idCampo) + 1}</p>
                                        </Box>
                                        <Box style={{color: 'white'}}>
                                            <p style={{fontSize: '12px'}}>id: {item.id}</p>
                                        </Box>
                                        <Box mt={2}>
                                        {item.cancelar ? (
                                            <Button
                                              variant="contained"
                                              color="success"
                                              fullWidth
                                              style={{ backgroundColor: '#8d1017', color: 'white' }}
                                              onClick={() => abriCancelarRerva(item.fecha, item.hora, item.id)} 
                                            >
                                              Cancelar
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                fullWidth
                                                style={{ backgroundColor: '#79ff53', color: 'white' }}
                                            >
                                                No puedes cancelar una reserva 2 horas antes.
                                            </Button>
                                        )}
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            )}
            <Backdrop open={abrirCancelar} style={{ zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                width="100%"
                position="relative"
                padding="25px"
                flexDirection="column"
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        style={{ color: 'white', width:'100%', display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box textAlign="center">
                        <p style={{color: 'white', fontWeight: 'bold'}}>Cancelar la reserva id "{cancelar}" para la fecha {diaCancelar}, a las {horaCancelar}?</p>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                        style={{ backgroundColor: '#79ff53', borderRadius: '8px' }}
                        >
                        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Confirmar'}
                        </Button>
                    </Box>
                </Box>
            </Backdrop>
        </Box>
    )
};

export default Reservas;
