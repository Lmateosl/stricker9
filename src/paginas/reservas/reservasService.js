import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class ReservasService {
  
  static getRervas(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .set('Authorization', `${window.localStorage.getItem('token')}`)
      .send(data)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error);
      });
  }

  static getHora(endpoint, callback) {
    request
      .get(`${BASE_URL}/${endpoint}`)
      .set('Authorization', `${window.localStorage.getItem('token')}`)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error);
      });
  }

  static postEliminarReserva(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .set('Authorization', `${window.localStorage.getItem('token')}`)
      .send(data)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error);
      });
  }
}

export default ReservasService;