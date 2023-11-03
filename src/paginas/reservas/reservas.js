import React, { useEffect, useState } from 'react';
import ReservasService from './reservasService';

function Reservas () {
    const [reservas, setReservas] = useState([]);
    useEffect(() => {
        // Petición POST 'reservasUsuario'
        ReservasService.getRervas('reservasUsuario', {numero: '+593995254076'}, (error, data) => {
            if (error) {
                console.log(error);
                if (error.response && error.response.body && error.response.body.error) {
                    const errorMessage = error.response.body.error;
                    console.log(errorMessage);
                } else {
                    console.log('Error del servidor');
                }
            } else {
                console.log('Respuesta de la petición POST:', data);
                setReservas(data);
                // Petición GET 'horaGuayaquil'
                ReservasService.getHora('horaGuayaquil', (error, data) => {
                    if (error) {
                        console.log(error);
                        if (error.response && error.response.body && error.response.body.error) {
                            const errorMessage = error.response.body.error;
                            console.log(errorMessage);
                        } else {
                            console.log('Error del servidor');
                        }
                    } else {
                        console.log('Respuesta de la petición GET:', data);
                    }
                });
            }
        });
    }, []);      

  return <div>Reservas Component</div>;
};

export default Reservas;
