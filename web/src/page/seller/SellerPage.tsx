import React from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../auth/Auth';
import ProductManager from '../../feature/product-manager/ProductManager';

const SellerPage = () => {

  const {user, logout} = useAuth();

  return (<div>
    <Header logout={logout} username={user!.username}/>
    <ProductManager/>
  </div>)
}

export default SellerPage;
