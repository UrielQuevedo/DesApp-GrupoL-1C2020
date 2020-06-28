import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { parse } from 'papaparse';
import { updateProductRequest } from '../Service/Api';

const UploadFileCSV = ({ products, setProducts }) => {
    
    const readFile = (e) => {
        parse(document.getElementById('files').files[0], {
            download: true,
            header: true,
            complete: results => {
                results.data.map(data => {
                   if(data.Id == "") {
                       console.log("Nothing")
                   } else {
                       const dataUpdated = transformFields(data);
                       fetchUpdateProduct(dataUpdated); 
                   }
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
            console.log(error);
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

    return (
        <div>
            <form>
            <div class="form-group">
                <label for="files">Modificar productos mediante CSV </label>
                <input type="file" id="files" class="form-control" accept=".csv" required />
            </div>
    
            <div class="form-group">
		        <button type="submit" id="submit-file" class="btn btn-primary" onClick={readFile}>Upload File</button>
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
        </div>
    )
}

export default UploadFileCSV;