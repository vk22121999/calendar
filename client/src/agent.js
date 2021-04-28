import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:5000/api';



const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  
    login: (email, password) =>
      requests.post('/auth/signin', {  email, password }),
    register: (name, email, password) =>
      requests.post('/auth/signup', {  name, email, password }),
  
  };

  

  const Events = {
    all: () =>
      requests.get(`/events/`),
    del: eventid =>
      requests.del(`/events/delete/${encode(eventid)}`),
    create: newevent =>
      requests.post(`/events/add`,{...newevent}),

    update: _event =>
      requests.put(`/events/update/${encode(_event.eventid)}`, {..._event }),
  
  };
  
 
  
  export default {

    Auth,
    Events,

 
    setToken: _token => { token = _token; }
  };
  