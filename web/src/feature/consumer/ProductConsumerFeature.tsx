import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  buy,
  clearBuyStateError,
  getProductForConsumer,
  selectBuyState,
  selectProductForConsumer, selectProductLoadingForConsumer,
} from './productConsumerSlice';
import ProductConsumerShelf from '../../components/product/ProductConsumerShelf';
import { Product } from '../../model/product';
import Confirm from '../../components/confirm/Confirm';
import { Alert } from 'react-bootstrap';


type ConfirmBy = {
  product: Product,
  amount: number
} | null;

interface Props {
  availableDeposit?: number;
  onBuy?: () => void
}

const ProductConsumerFeature = ({availableDeposit = Infinity, onBuy}: Props) => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProductForConsumer);
  const isLoading = useAppSelector(selectProductLoadingForConsumer);
  const buyState = useAppSelector(selectBuyState);
  const [confirmBuy, setConfirmBuy] = useState<ConfirmBy>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);


  useEffect(() => {
    dispatch(getProductForConsumer())
  }, []);

  const handleBuy = (product: Product, amount: number) => {
    setConfirmBuy({
      product: product,
      amount: amount,
    });
  }

  const handleConfirm = () => {
    dispatch(buy({
      productId: confirmBuy!.product.id,
      amount: confirmBuy!.amount,
    }));
  }

  useEffect(() => {
    if (buyState.success) {
      dispatch(getProductForConsumer());
      setConfirmBuy(null);
      setShowSuccess(true);
      onBuy && onBuy();
    }
  }, [buyState.success]);

  const onConfirmClose = () => {
    dispatch(clearBuyStateError());
    setConfirmBuy(null);
  };
  return (
    <>
      {isLoading && <Alert variant="warning">Loading...</Alert>}
      <ProductConsumerShelf deposit={availableDeposit} onBuy={handleBuy} products={products}/>

      {
        confirmBuy &&
        <Confirm disabledOk={buyState.loading} closeOnOk={false} onConfirm={handleConfirm} onClose={onConfirmClose}>
          <p> You are buying <span className="fw-bolder">{confirmBuy.amount}</span> {confirmBuy.product.productName}</p>
          <p> and you will be charged with <span
            className="fw-bolder">{confirmBuy.amount * confirmBuy.product.cost}</span> cents.</p>
          {buyState.isError && <p className="text-danger">{buyState.errorMessage}</p>}
        </Confirm>
      }

      {
        showSuccess &&
        <Confirm onConfirm={() => setShowSuccess(false)} onClose={() => setShowSuccess(false)}>
          <p className="text-success">You purchased successfully</p>
        </Confirm>
      }
    </>
  )
}

export default ProductConsumerFeature;
