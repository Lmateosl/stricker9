import request from 'superagent';

const BASE_URL = 'http://localhost:8000/api'; // URL base de tu API

class userService {

  static get(endpoint, callback) {
    request
      .get(`${BASE_URL}/${endpoint}`)
      .set('Authorization', `${window.localStorage.getItem('token')}`)
      .then((response) => {
        callback(null, response.body); // Enviar los datos a través de la función de devolución de llamada
      })
      .catch((error) => {
        callback(error); // Enviar el error a través de la función de devolución de llamada
      });
  }
  
}

export default userService;
