import axios from 'axios';

const server = process.env.REACT_APP_API_BACKEND;

const request = (type, path, body, params) => axios
    .request({
        url: `${server}${path}`,
        method: type,
        data: body,
        params: params
    })
    .then(req => req.data);

export const registerRequest = (user_data) => request('POST', '/api/auth/register', user_data);
export const loginRequest = (email, password) => request('POST', `/api/auth/login?email=${email}&password=${password}`);
export const sendBuyerLocationRequest = (id, location) => request('PUT', `/api/v1/users/${id}/location`, location);
export const getStoreByIdUserRequest = (idUser) => request('GET', `/api/${idUser}/stores`);
export const addProductRequest = (idStore, product_data) => request('POST', `/api/stores/${idStore}/products`, product_data);
export const deleteProductRequest = (idProduct) => request('DELETE', `/api/stores/products/${idProduct}`);
export const updateProductRequest = (idProduct, product_data) => request('PUT', `/api/stores/products/${idProduct}`, product_data);
export const getUserById = (idUser) => request('GET', `/api/v1/users/${idUser}`);
export const publishStoreRequest = (idUser, store_data) => request('POST', `/api/users/${idUser}/stores`, store_data);
export const existsProductsRequest = (ids) => request('GET', `/api/stores/products/exists/${ids}`);