import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { parse } from 'papaparse';
import { updateProductRequest, existsProductsRequest } from '../Service/Api';
import DialogSuccess from './DialogSuccess';
import DialogError from './DialogError';
import { useForm } from 'react-hook-form';

const UploadFileCSV = ({ setProducts }) => {
    
    const [ error, setError ] = useState(null);
    const [ openSuccess, setOpenSuccess ] = useState(false);
    const [ openError, setOpenError ] = useState(false);
    const { register, handleSubmit } = useForm();

    const readFile = (data, e) => {
        parse(document.getElementById('files').files[0], {
            download: true,
            header: true,
            complete: results => {
                console.log(results.data);
                const list = results.data.filter(product => product.Id !== "");
                const ids = list.map(product => product.Id).toString();
                existsProductsRequest(ids)
                .then(_ => {
                    list.map(data => {
                        const dataUpdated = transformFields(data);
                        fetchUpdateProduct(dataUpdated);
                        handleClickOpenSuccess();
                        e.target.reset();
                    }) 
                })
                .catch(error => { 
                    setError(error.response.data.message);
                    handleClickOpenError();
                    e.target.reset();
                })
            }
        });
    }

    const fetchUpdateProduct = (_product) => {
        updateProductRequest(_product.id, _product)
        .then(data => {
            console.log(data);
            setProducts(oldProducts => {
             let productsUpdated = [];
             oldProducts.forEach(product => productsUpdated.push(product));
             let oldProduct = productsUpdated.find(product => product.id === data.id);
             oldProduct.name = data.name;
             oldProduct.brand = data.brand;
             oldProduct.stock = data.stock;
             oldProduct.price = data.price;
             oldProduct.category = data.category;
             oldProduct.image_url = data.image_url;
             return productsUpdated;
           })
         })
        .catch(error => {
            console.log(error.response.data.message);
        })         
    }

    const transformFields = (data) => {
        return {
            id: parseInt(data.Id),
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
                <label for="files">Modificar productos mediante CSV </label>
                <input type="file" id="files" accept=".csv" required  inputRef={register} name='select-file'/>
            </div>
    
            <div class="form-group">
		        <button type="submit" id="submit-file" class="btn btn-primary"  inputRef={register} name='upload-file'>Upload File</button>
	        </div>
            {/*
            <Button
            className="form-group"
            type="submit"
            variant="contained"
            color="default"
            onClick={readFile}
            startIcon={<CloudUploadIcon />}
            >
            Subir archivo
            </Button>
            */ }
            </form>
            { openSuccess && <DialogSuccess open={openSuccess} handleClose={handleCloseSuccess}/> }
            { openError && <DialogError message={error} setMessage={setError} open={openError} handleClose={handleCloseError}/> }
        </div>
    )
}

export default UploadFileCSV;