import NavigateToLogin from '../../feature/login/NavigateToLogin';
import React from 'react';
import { useAuth } from '../../auth/Auth';
import BuyerPage from '../buyer/BuyerPage';
import SellerPage from '../seller/SellerPage';

const MachinePage = () => {

  const {user} = useAuth();

  return !user || !user.roles
    ? <NavigateToLogin/>
    : (user!.roles.includes('BUYER') ? <BuyerPage/> : <SellerPage/>)

}

export default MachinePage;
