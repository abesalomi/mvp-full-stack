import React from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../auth/Auth';
import ProductManagerFeature from '../../feature/product-manager/ProductManagerFeature';
import LogoutAllFeature from '../../feature/logout-all/LogoutAllFeature';

const SellerPage = () => {

  const {user, logout} = useAuth();

  return (
    <div>
      <LogoutAllFeature/>
      <Header logout={logout} username={user!.username}/>
      <ProductManagerFeature/>
    </div>
  )
}

export default SellerPage;
