import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendario.css';
import CalendarioService from './calendarioService';
import { Box, Button, Backdrop, IconButton, CircularProgress} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calendario({campo, horarioN, horarioF, idCancha, nombreCancha, numeroCancha}) {
  const user = useSelector((state) => state.user); // Accede al estado global del usuario

  const [today] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada
  const [abrirHorarios, setAbrirHorarios] = useState(false);
  const [horas, setHoras] = useState();
  const [fechaHoraReserva, setFechaHoraReserva] = useState('');
  const [fechaReserva, setFechaReserva] = useState('');
  const [horaReserva, setHoraReserva] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirectToReservas, setRedirectToReservas] = useState(false);

  const tileDisabled = ({ date }) => {
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const formatShortMonth = (locale, date) => {
    return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimeout(() => {setAbrirHorarios(true)}, 200);
  };

  useEffect(() => {
    // Se establece el mes actual para el calendario
    setCurrentMonth(today);

    // Se hace el codigo para sacar todas las horas del dia segun lo recibido del componente padre 
    const horass = [];
    if (selectedDate !== null) {
      const fechaFormat = new Date(selectedDate);
      //Trasformamos la fecha a iso para enviarla a servidor mas adelante 
      const fechaISO = fechaFormat.toISOString().split('T')[0];
      // Guardamos en el estado si el dia seleccionado es entresemana o fin de semana 
      const isDiaDeSemana = fechaFormat.getDay() >= 1 && fechaFormat.getDay() <= 5;
      const horario = isDiaDeSemana ? horarioN : horarioF;

      // Se establecen los datos para enviar al servidor y que nos den las reservas de la fecha seleccionada
      const idCampo = campo.idCampo.toString();
      const fecha = fechaISO;
      const data = {
        idCancha,
        idCampo,
        fecha
      }
      //Llamamos al servicio y le enviamos los datos para que nos devuelva las reservas en una fecha, campo y cancha especifica  
      CalendarioService.postRervas('reservas', data, (error, response) => {
        if (error) {
          if (error.response && error.response.body && error.response.body.error) {
            const errorMessage = error.response.body.error;
            console.log(errorMessage);
            localStorage.removeItem('token');
          } else {
            console.log('Error del servidor');
            localStorage.removeItem('token');
          }
        } else {
          // Se guada el estado reservas
          const reservas = response;
          // Ahora si es entre semana se usa horario N
          if (isDiaDeSemana) {
            const n = horario.length;
            for (let i = 0; i < n; i++) {
              // Se hace una comparativa de la hora en que se abre y se cierra para anadir cada hora como un elemento del estado array horas
              const x = (parseInt(horario[i].split('-')[1]) - parseInt(horario[i].split('-')[0]) + 1);
              const inicioHora = parseInt(horario[i].split('-')[0]);
              for (let y = 0; y < x; y++) {
                const hora = inicioHora + y;
                const dispo = reservas.some((objeto) => objeto.hora === hora);
                const horaDispo = {
                  disponible: dispo,
                  hora: hora
                }
                horass.push(horaDispo);
              }
            }
            setHoras(horass);
          // Si es un dia del fin de semana se hace o mismo que arriva pero con horarioF
          } else {
            const n = horario.length;
            for (let i = 0; i < n; i++) {
              const x = (parseInt(horario[i].split('-')[1]) - parseInt(horario[i].split('-')[0]) + 1);
              const inicioHora = parseInt(horario[i].split('-')[0]);
              for (let y = 0; y < x; y++) {
                const hora = inicioHora + y;
                const dispo = reservas.some((objeto) => objeto.hora === hora);
                const horaDispo = {
                  disponible: dispo,
                  hora: hora
                }
                horass.push(horaDispo);
              }
            }
            setHoras(horass);
          }
        }
      });
    }
  }, [today, selectedDate, horarioF, horarioN, idCancha, campo.idCampo]);

  const reservar = (reserva) => {
    const fechaFormat = new Date(selectedDate);
    const fechaISO = fechaFormat.toISOString().split('T')[0]; //Trasformamos la fecha a iso para enviarla a servidor mas adelante 
    setFechaReserva(fechaISO); //Ponemos la fecha en el estado fechaRerva para tenerla disponible mas adelante
    setHoraReserva(reserva); // Establece la hora seleccionada en un estado para usuarla mas adelante
    const nuevaFecha = new Date(selectedDate.getTime()); // Crear una nueva instancia de fecha para no modificar la original
    nuevaFecha.setHours(reserva); // Establecer la nueva hora
    setFechaHoraReserva(formatFecha(nuevaFecha)); //Llamamos a la funcion para que nos devuelva la fecha con el formato "4 de Junio a las 16:00"
    setOpen(true); //Se abre el modal para confirmar a reserva
  }

  function formatFecha(fecha) {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const hora = fecha.getHours();
    
    return `${dia} de ${mes} a las ${hora}:00`;
  }

  const handleClose = () => {
    //Funcion para cerrar el modal
    setOpen(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    const idCampo = campo.idCampo.toString();
    const data = {
      idCampo,
      idCancha,
      nombre: user.nombre,
      numero: user.telefono,
      cedula: user.cedula,
      uid: user.uid,
      fecha: fechaReserva,
      hora: horaReserva,
      nombreCancha,
      numeroCancha
    };
    console.log(data);

    CalendarioService.postCrearRerva('crearReserva', data, (error, data) => {
      if (error) {
        setLoading(false);
        console.log(error);
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
      } else {
        setLoading(false);
        setOpen(false);
        console.log('Respuesta de la petición POST:', data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setRedirectToReservas(true);
      }
    });
  };

  if (redirectToReservas) {
    return <Navigate to="/reservas" />;
  }

  return (
    <div>
      {abrirHorarios ?
        <div>
          {horas.map((objeto, index) => (
            <Button
              key={index}
              variant="contained"
              fullWidth
              disabled={objeto.disponible}
              sx={{
                backgroundColor: objeto.disponible ? '#79ff53' : '#1f1f1f',
                color: objeto.disponible ? 'white !important' : '#79ff53',
                border: objeto.disponible ? 'none' : '1px solid #79ff53',
                borderRadius: '8px',
                margin: '5px',
                '&:hover': {
                  backgroundColor: '#79ff53',
                  color: 'white',
                  border: 'none',
                },
              }}
              onClick={() => reservar(objeto.hora)}
            >
              {objeto.hora}:00
            </Button>
          ))}
          <Button 
            onClick={() => setAbrirHorarios(false)} 
            variant="contained" 
            fullWidth 
            sx={{
              backgroundColor: 'white', 
              color: '#1f1f1f', 
              border: 'none', 
              margin: '15px 5px'
            }}
          >
            Atrás
          </Button>
        </div>
        :
        <div className="calendario">
          <Calendar
            value={currentMonth}
            onClickMonth={(value) => setCurrentMonth(value)}
            tileClassName={({ date, view }) => {
              if (view === 'month' && date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                return 'react-calendar__tile--now';
              }
              return null;
            }}
            tileDisabled={tileDisabled}
            formatShortMonth={formatShortMonth}
            next2Label={null}
            prev2Label={null}
            onClickDay={handleDateChange} // Agrega el evento onChange para manejar la selección de fechas
          />
        </div>
      }
      <Backdrop open={open} style={{ zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
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
            <p style={{color: 'white', fontWeight: 'bold'}}>Confirmar reserva para el día {fechaHoraReserva}</p>
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
    </div>
  );
}

export default Calendario;
