
export interface Product {
  id: number;
  productName: string;
  amountAvailable: number;
  cost: number;
}


export interface ProductUpdateRequest {
  productName: string;
  amountAvailable: number;
  cost: number;
}
