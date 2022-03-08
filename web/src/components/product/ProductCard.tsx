import { Button, Card } from 'react-bootstrap';
import React from 'react';
import { Product } from '../../model/product';

interface Props {
  product: Product,
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
}

const ProductCard = ({product, onEdit, onDelete}: Props) => {

  return (
    <Card>
      <Card.Img variant="top" src={`https://via.placeholder.com/400x200/88D498?text=${product.productName}`}/>
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>
          Amount Available: {product.amountAvailable}
        </Card.Text>
        <Card.Text>
          Cost: {product.cost}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => onEdit(product)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(product)}>Delete</Button>
      </Card.Footer>
    </Card>
  )
}

export default ProductCard;
