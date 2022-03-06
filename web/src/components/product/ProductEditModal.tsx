import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Product, ProductUpdateRequest } from '../../model/product';
import { partial } from 'lodash';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onEdit: (product: ProductUpdateRequest, productId: number) => void;
  onClose: () => void;
  product: Product;
  errors?: string[]
}

const ProductEditModal = ({onClose, onEdit, product, errors}: Props) => {

  const [data, setData] = useState<Product>(product);

  const handleChange = (name: keyof Product, e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [name]: e.target.value,
    })
  }

  const handleClose = () => {
    onClose()
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onEdit({
      productName: data.productName,
      cost: data.cost,
      amountAvailable: data.amountAvailable,
    }, product.id);
  }

  return product ? (
    <Modal show={true} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit: {product.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <ul className="text-danger">
            {errors?.map((m, i) => (<li key={i}>{m}</li>))}
          </ul>

          <FloatingLabel controlId="productName" label="Product Name" className="mb-3">
            <Form.Control value={data.productName} required type="text" placeholder="Product Name"
                          onChange={partial(handleChange, 'productName')}/>
          </FloatingLabel>

          <FloatingLabel controlId="cost" label="Cost" className="mb-3">
            <Form.Control value={data.cost} required type="number" min={1} placeholder="Cost"
                          onChange={partial(handleChange, 'cost')}/>
          </FloatingLabel>

          <FloatingLabel controlId="amountAvailable" label="Amount Available">
            <Form.Control value={data.amountAvailable} required min={0} type="number" placeholder="Amount Available"
                          onChange={partial(handleChange, 'amountAvailable')}/>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type={'submit'}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  ) : null;
}


export default ProductEditModal;
