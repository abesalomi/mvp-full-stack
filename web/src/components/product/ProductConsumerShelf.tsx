import { Product } from '../../model/product';
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import ConsumerProductCard from './ConsumerProductCard';

interface Props {
  products: Product[],
  deposit: number;
  onBuy: (product: Product, amount: number) => void
}

const ProductConsumerShelf = ({deposit, products, onBuy}: Props) => {

  return (
    <Row>
      {
        products.map((product) => (
          <Col key={product.id} className="pb-3" sm={6} xl={4}>
            <ConsumerProductCard
              deposit={deposit}
              product={product}
              onBuy={onBuy}/>
          </Col>
        ))
      }
    </Row>
  );
}

export default ProductConsumerShelf;
