import { Button, Card, Form } from 'react-bootstrap';
import React, { useMemo, useState } from 'react';
import { Product } from '../../model/product';
import { times } from 'lodash';

interface Props {
  product: Product,
  deposit: number;
  onBuy: (product: Product, amount: number) => void
}

const ConsumerProductCard = ({product, onBuy, deposit}: Props) => {

  const [amount, setAmount] = useState(1);


  const affordable = useMemo(() => {
    return deposit / product.cost;
  }, [deposit, product.cost]);

  const handleBuy = () => {
    onBuy(product, amount);
    setAmount(1);
  }

  const cssFilter = useMemo(() => {
    if (product.amountAvailable) {
      return {}
    }

    return {
      filter: 'grayscale(1)'
    }
  }, [product.amountAvailable])

  return (
    <Card>
      <Card.Img style={cssFilter} variant="top" src={`https://via.placeholder.com/400x200/88D498?text=${product.productName}`}/>
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
        {product.amountAvailable
          ? (
            <Form.Select onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} className="me-2">
              {
                times(Math.min(10, product.amountAvailable), (n) => (
                  <option disabled={(n + 1) > affordable} key={n + 1} value={n + 1}>{n + 1}</option>
                ))
              }
            </Form.Select>
          )
          : <span className="text-danger">Out of Stock</span>}
        <Button disabled={!product.amountAvailable || affordable < 1} variant="success" onClick={handleBuy}>Buy</Button>
      </Card.Footer>
    </Card>
  )
}

export default ConsumerProductCard;
