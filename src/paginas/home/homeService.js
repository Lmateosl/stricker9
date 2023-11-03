import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class homeService {

  static get(endpoint, callback) {
    request
      .get(`${BASE_URL}/${endpoint}`)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error); // Enviar el error a través de la función de devolución de llamada
      });
  }
  
}

export default homeService;
