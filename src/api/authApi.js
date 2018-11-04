import axios from 'axios';

axios.defaults.baseURL = 'http://node-express-env.uk5kynbbj6.us-east-1.elasticbeanstalk.com';

export function defaultAPI(params) {
  return axios
    .post(params.path, params)
    .then(response => ({ params, response }))
    .catch(error => ({ params, error }));
}

export function resetPassword(params) {
  return axios
    .post('/password/reset', params, { headers: { Authorization: `Bearer ${params.token}` } })
    .then(response => ({ params, response }))
    .catch(error => ({ params, error }));
}
