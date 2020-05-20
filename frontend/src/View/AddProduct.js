import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormProduct from './FormProduct';

const AddProduct = ({ products }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Agregar producto</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Producto a agregar</ModalHeader>
        <ModalBody>
          <FormProduct products={products}/> 
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddProduct;