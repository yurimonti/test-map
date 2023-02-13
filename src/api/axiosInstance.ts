import axios from "axios";

const baseURL = 'http://localhost:8080/api/v1';

axios.defaults.baseURL = baseURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const privateInstance = axios.create({
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access') }
});

const publicInstance = axios.create();



export {privateInstance,publicInstance}