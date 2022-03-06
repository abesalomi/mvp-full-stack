import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addProduct,
  closeProductAddModal,
  closeProductEditModal,
  confirmDeleteProduct,
  deleteProduct,
  disableDelete,
  editProduct,
  getProductForSeller,
  openProductEditModal,
  selectProduct,
  selectProductAddState,
  selectProductDeleteState,
  selectProductEditState,
  showProductAddModal,
} from './productManagerSlice';
import { useAuth } from '../../auth/Auth';
import Confirm from '../../components/confirm/Confirm';
import ProductCard from '../../components/product/ProductCard';
import ProductEditModal from '../../components/product/ProductEditModal';
import ProductAddModal from '../../components/product/ProductAddModal';

const ProductManager = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProduct);
  const deleteState = useAppSelector(selectProductDeleteState);
  const editState = useAppSelector(selectProductEditState);
  const addState = useAppSelector(selectProductAddState);

  const {user} = useAuth();

  useEffect(() => {
    dispatch(getProductForSeller(user!.id))
  }, []);

  useEffect(() => {
    if (deleteState.success) {
      dispatch(getProductForSeller(user!.id))
    }
  }, [deleteState.success]);

  useEffect(() => {
    if (editState.success) {
      dispatch(getProductForSeller(user!.id));
      dispatch(closeProductEditModal());
    }
  }, [editState.success]);

  useEffect(() => {
    if (addState.success) {
      dispatch(getProductForSeller(user!.id));
      dispatch(closeProductAddModal());
    }
  }, [addState.success]);

  return (
    <Container className="mt-2">
      {
        deleteState.isError && (
          <Alert variant="danger">{deleteState.errorMessage}</Alert>
        )
      }
      <Row>
        {
          products.map(product => (
            <Col key={product.id} className="pb-3" sm={6} lg={4} xl={3}>
              <ProductCard
                product={product}
                onEdit={() => dispatch(openProductEditModal(product))}
                onDelete={() => dispatch(confirmDeleteProduct(product))}/>
            </Col>
          ))
        }
      </Row>


      <Button onClick={() => dispatch(showProductAddModal())}
              style={{width: '3rem', height: '3rem'}}
              className="position-absolute bottom-0 end-0 me-5 mb-5 rounded-circle">
        +
      </Button>

      {
        deleteState.product && (
          <Confirm onClose={() => dispatch(disableDelete())}
                   onConfirm={() => dispatch(deleteProduct(deleteState!.product!.id))}>
            Do you really want to delete {deleteState.product.productName}?
          </Confirm>
        )
      }
      {editState.product && <ProductEditModal errors={editState.errorMessage} product={editState.product}
                                              onEdit={(updatedProduct, productId) => {
                                                dispatch(editProduct({
                                                  product: updatedProduct,
                                                  productId: productId,
                                                }))
                                              }}
                                              onClose={() => dispatch(closeProductEditModal())}/>}
      {addState.showModal && <ProductAddModal errors={addState.errorMessage}
                             onAdd={(product) => dispatch(addProduct(product))}
                             onClose={() => dispatch(closeProductAddModal())} show={addState.showModal}/>}
    </Container>
  );
}

export default ProductManager;
