import React, { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { parse } from 'papaparse';
import { updateProductRequest, existsProductsRequest } from '../Service/Api';
import DialogSuccess from './DialogSuccess';

const DialogError = ({ error, setError }) => {
    return (
        <div>
           {console.log(error)}
        </div>
    )
}

const UploadFileCSV = ({ setProducts }) => {
    
    const [ error, setError ] = useState(null);
    const [ open, setOpen ] = useState(false);

    const readFile = (e) => {
        e.preventDefault();
        parse(document.getElementById('files').files[0], {
            download: true,
            header: true,
            complete: results => {
                const list = results.data.filter(product => product.Id !== "");
                const ids = list.map(product => product.Id).toString();
                console.log(ids);
                existsProductsRequest(ids)
                .then(_ => {
                    list.map(data => {
                        const dataUpdated = transformFields(data);
                        fetchUpdateProduct(dataUpdated);
                        handleClickOpen(); 
                    }) 
                })
                .catch(error => setError(error.response.data.message));
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
        console.log(toUpperCase);
        if(toUpperCase == "BEBIDAS" || toUpperCase == "FIDEOS" || toUpperCase == "GALLETITAS" || toUpperCase == "FIAMBRE") {
            return toUpperCase;        
        } else {
            return null;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <form>
            <div class="form-group">
                <label for="files">Modificar productos mediante CSV </label>
                <input type="file" id="files" class="form-control" accept=".csv" required />
            </div>
    
            <div class="form-group">
		        <button type="submit" id="submit-file" class="btn btn-primary" onClick={readFile}>Subir archivo</button>
	        </div>
            
            {/*<Button
            className="form-group"
            type="submit"
            variant="contained"
            color="default"
            onClick={handleData}
            startIcon={<CloudUploadIcon />}
            >
            Subir archivo
            </Button>
            */}
    
            </form>
            { open && <DialogSuccess open={open} handleClose={handleClose}/> }
            { error && <DialogError error={error} setError={setError}/> }
        </div>
    )
}

export default UploadFileCSV;