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
export const sendBuyerLocationRequest = (id, location) => request('PUT', `/api/v1/users/${id}/location`, location);
export const getStoreByIdUserRequest = (idUser) => request('GET', `/api/${idUser}/stores`);
export const addProductRequest = (idStore, product_data) => request('POST', `/api/stores/${idStore}/products`, product_data);
export const deleteProductRequest = (idStore, idProduct) => request('DELETE', `/api/stores/${idStore}/products/${idProduct}`);
export const getUserById = (idUser) => request('GET', `/api/v1/users/${idUser}`);