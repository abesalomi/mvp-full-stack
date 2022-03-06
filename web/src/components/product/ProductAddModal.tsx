import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Product, ProductUpdateRequest } from '../../model/product';
import { partial } from 'lodash';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

interface Props {
  onAdd: (product: ProductUpdateRequest) => void;
  onClose: () => void;
  errors?: string[];
  show: boolean
}

const ProductAddModal = ({onClose, onAdd, errors, show}: Props) => {

  const [data, setData] = useState<ProductUpdateRequest>({
    productName: '',
  } as ProductUpdateRequest);

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

    onAdd({
      productName: data.productName,
      cost: parseInt(data.cost?.toString()),
      amountAvailable: parseInt(data.amountAvailable?.toString()),
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create new product</Modal.Title>
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
            <Form.Control value={data.cost || ''} required type="number" min={1} placeholder="Cost"
                          onChange={partial(handleChange, 'cost')}/>
          </FloatingLabel>

          <FloatingLabel controlId="amountAvailable" label="Amount Available">
            <Form.Control value={data.amountAvailable || ''} required min={0} type="number" placeholder="Amount Available"
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
  ) ;
}


export default ProductAddModal;
