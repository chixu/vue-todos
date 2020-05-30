
const axios = require('axios');
import { globals } from '../constant';

export function get(url) {
  return axios.get(url);
}

export function post(url, data) {
  return axios.post(url, data)
}

export function api(name, data) {
  let url = globals.apiRoot + name;
  return new Promise((resolve, reject) => {
    // let request = data ? axios.post(url, data) : axios.get(url);
    let request = axios.post(url, {
      token: window.$cookies.get('token'),
      data
    });
    request.then(res => {
      let data = res.data;
      if (data.err)
        reject(data.err);
      else
        resolve(data.data);
    });
  })
}