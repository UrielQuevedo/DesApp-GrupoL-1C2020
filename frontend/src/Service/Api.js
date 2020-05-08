import axios from 'axios';

//TODO Agregar Api de Backend de Heroku;
const server = 'http://localhost:8080';

const request = (type, path, body, params) => axios
    .request({
        url: `${server}${path}`,
        method: type,
        data: body,
        params: params,
    })
    .then(req => req.data);

export const registerRequest = (user_data) => request('POST', '/api/v1/auth/register', user_data);
export const loginRequest = (user_data) => request('POST', '/api/v1/auth/login', user_data);
export const sendBuyerLocationRequest = (id, location) => request('PUT', `/api/v1/buyer/${id}/location`, location);

