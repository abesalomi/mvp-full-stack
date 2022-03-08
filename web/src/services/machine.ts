import { http } from './http';
import { Product } from '../model/product';
import { BuyRequest } from '../model/buy';
import { Deposit } from '../model/deposit';

export const httpBuy = (buyRequest: BuyRequest) => http.post<Product[]>(`/machine/buy`, buyRequest)
  .then(({data}) => data);

export const httpGetDeposit = () => http.get<Deposit>('/machine/deposit')
  .then(({data}) => data);

export const httpAddDeposit = (deposit: Deposit) => http.post<Deposit>('/machine/deposit', deposit)
  .then(({data}) => data);

export const httpResetDeposit = () => http.post<Deposit>('/machine/reset')
  .then(({data}) => data);
