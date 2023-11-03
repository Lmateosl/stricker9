import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class LoginService {
  
  static postLogin(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .send(data)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error);
      });
  }
  
  static postPass(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .send(data)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error);
      });
  }
}

export default LoginService;
