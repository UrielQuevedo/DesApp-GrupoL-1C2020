import React , { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addProductRequest } from '../Service/Api';

const FormProduct = ({ products }) => {


    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image_url, setImageUrl] = useState('');

    const addProduct = () => {
      const product = { name, brand, price, stock, image_url }

      addProductRequest(2, product)
      .then(() => {
        console.log("se agrego con exito");
      })
      .catch(error => {
        console.log(error);
      })
    } 


  return (
    <Form>
      <FormGroup>
        <Label for="exampleName">Nombre</Label>
        <Input type="text" name="name" id="exampleName" placeholder="Ingresar nombre" onChange={e => setName(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleBrand">Marca</Label>
        <Input type="text" name="brand" id="exampleBrand" placeholder="Ingresar marca" onChange={e => setBrand(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePrice">Precio</Label>
        <Input type="number" name="price" id="examplePrice" placeholder="Ingresar precio" onChange={e => setPrice(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleStock">Stock</Label>
        <Input type="number" name="stock" id="exampleStock" placeholder="Ingresar stock" onChange={e => setStock(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleUrlImagen">Url imagen</Label>
        <Input type="text" name="image_url" id="exampleUrlImagen" placeholder="Ingresar url imagen" onChange={e => setImageUrl(e.target.value)}/>
      </FormGroup>
      <Button color="primary" onClick={addProduct}>Guardar</Button>{' '}
      <Button variant="primary" type="submit" onClick={() => console.log("esta haciendo click")}>
        Cancelar
      </Button>
      </Form>
  );
}


export default FormProduct;