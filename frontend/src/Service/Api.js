import axios from 'axios';

//TODO Agregar Api de Backend de Heroku;
const server = 'http://localhost:5000';

const request = (type, path, body, params) => axios
    .request({
        url: `${server}${path}`,
        method: type,
        data: body,
        params: params,
    })
    .then(req => req.data);