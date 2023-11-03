import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class SignupService {

  static postSingin(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .send(data)
      .then((response) => {
        console.log('Respuesta de la petición POST:', response);
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error); // Enviar el error a través de la función de devolución de llamada
      });
  }

  static postCodigo(endpoint, data, callback) {
    request
      .post(`${BASE_URL}/${endpoint}`)
      .send(data)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error); // Enviar el error a través de la función de devolución de llamada
      });
  }
  
}

export default SignupService;
