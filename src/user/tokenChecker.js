import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../states/stateSlice';
import userService from './userService';

const TokenTracker = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      if (!user.mail) {
        userService.get('datosUsuario', (error, data) => {
          if (error) {
            if (error.response && error.response.body && error.response.body.error) {
              const errorMessage = error.response.body.error;
              console.log(errorMessage);
              window.localStorage.removeItem('token');
            } else {
              console.log('Error del servidor');
              window.localStorage.removeItem('token');
            }
          } else {
            console.log(data);
            const newUser = {
              nombre: data.nombre,
              cedula: data.cedula,
              telefono: data.telefono,
              mail: data.mail,
              uid: data.uid || ''
            };
        
            dispatch(setUser(newUser));
          }
        });
      } else {
        console.log('Usuario ya logeado');
      }
    } else {
      console.log('Token no encontrado');
    }
  }, [dispatch, user]);

  return null; // No se renderiza ningún contenido en el componente
};

export default TokenTracker;


