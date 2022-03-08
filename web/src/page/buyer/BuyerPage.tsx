import React from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../auth/Auth';
import ProductManager from '../../feature/product-manager/ProductManager';
import { Col, Container, Row } from 'react-bootstrap';
import ProductConsumer from '../../feature/consumer/ProductConsumer';
import DepositFeature from '../../feature/deposit/DepositeFeature';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDeposit, selectDeposit } from '../../feature/deposit/depositSlice';

const BuyerPage = () => {

  const {user, logout} = useAuth();

  const deposit = useAppSelector(selectDeposit);
  const dispatch = useAppDispatch();

  const fetchDeposit = () => dispatch(getDeposit());

  return (<div>
    <Header logout={logout} username={user!.username}/>
    <Container className="mt-3">
      <Row>
        <Col xs={{span: 12, order: 2}} lg={{span: 8, order: 1}}>
          <ProductConsumer availableDeposit={deposit} onBuy={fetchDeposit}/>
        </Col>
        <Col xs={{span: 12, order: 1}} lg={{span: 4, order: 2}}>
          <DepositFeature/>
        </Col>
      </Row>
    </Container>
  </div>)
}

export default BuyerPage;
