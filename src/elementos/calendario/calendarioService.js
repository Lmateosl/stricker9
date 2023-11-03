import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class CalendarioService {
  
  static postRervas(endpoint, data, callback) {
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

  static postCrearRerva(endpoint, data, callback) {
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

export default CalendarioService;
