import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { parse } from 'papaparse';
import { updateProductRequest, existsProductsRequest } from '../Service/Api';
import DialogSuccess from './DialogSuccess';
import DialogError from './DialogError';
import { useForm } from 'react-hook-form';
import { addProductRequest } from '../Service/Api';
import '../Styles/Store.css';

const UploadFileCSVAdd = ({ idStore, close, setProducts }) => {
    const [ error, setError ] = useState(null);
    const [ openSuccess, setOpenSuccess ] = useState(false);
    const [ openError, setOpenError ] = useState(false);
    const { register, handleSubmit } = useForm();

    const readFile = (data, e) => {
        const s = document.getElementById('file-add').files[0];
        parse(document.getElementById('file-add').files[0], {
            download: true,
            header: true,
            complete: results => {
                console.log(results.data);
                if (checkFields(results.meta.fields)) {
                    e.target.reset();
                    return ;
                }
                results.data.map(product => {
                    const product_data = transformFields(product);
                    console.log(product_data);
                    addProductRequest(idStore, product_data)
                    .then(data => {
                        setProducts(oldProducts => {
                            let productsUpdated = [];
                            oldProducts.forEach(product => {
                                productsUpdated.push(product);
                            });
                            productsUpdated.push(data);
                            return productsUpdated;
                          });
                        handleClickOpenSuccess();
                        close();
                        e.target.reset();
                    })
                    .catch(error => {
                        console.log(error.response.data.message);
                        setError(error.response.data.message);
                        handleClickOpenError();
                        close();
                        e.target.reset();
                    })
                })
            }
        });
    }

    const checkFields = (fields) => {
        const toLowerCaseFields = fields.map(field => field.toLowerCase());
        if (toLowerCaseFields[0] != "nombre" || toLowerCaseFields[1] != "marca" || toLowerCaseFields[2] != "stock" ||
        toLowerCaseFields[3] != "precio" || toLowerCaseFields[4] != "imagen" || toLowerCaseFields[5] != "categoria") {
            setError("¡Ups! Introdujo mal un campo...");
            handleClickOpenError();
            close();
            return true;
        }
        return false;
    }

    const transformFields = (data) => {
        return {
            name: data.Nombre,
            brand: data.Marca,
            stock: parseInt(data.Stock),
            price: parseFloat(data.Precio),
            image_url: data.Imagen,
            category: checkCategory(data.Categoria)
        }
    }
    
    const checkCategory = (category) => {
        const toUpperCase = category.toUpperCase();
        if(toUpperCase == "BEBIDAS" || toUpperCase == "FIDEOS" || toUpperCase == "GALLETITAS" || toUpperCase == "FIAMBRE") {
            return toUpperCase;        
        } else {
            return null;
        }
    }

    const handleClickOpenSuccess = () => {
        setOpenSuccess(true);
    }
    
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

    const handleClickOpenError = () => {
        setOpenError(true);
    }

    const handleCloseError = () => {
        setOpenError(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(readFile)}>
            <div class="form-group">
                <label for="files">Subir archivo </label>
                <br/>
                <input type="file" id="file-add" accept=".csv" required inputRef={register} name='select-file'/>
            </div>
            <Button onClick={close} className="moveButton" color="primary">
                Cancelar
            </Button>
            <Button type="submit" id="submit-file" className="moveButton" color="primary">
                Guardar
            </Button>
            </form>
            
            { openSuccess && <DialogSuccess open={openSuccess} handleClose={handleCloseSuccess}/> }
            { openError && <DialogError message={error} setMessage={setError} open={openError} handleClose={handleCloseError}/> }
        </div>
    )
}

export default UploadFileCSVAdd;