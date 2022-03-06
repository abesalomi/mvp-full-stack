import { Min, MinLength, Validate } from 'class-validator';
import { CostValidator } from '../validator/cost.validator';

export class ProductUpdateRequest {

  @MinLength(2)
  productName: string;

  @Min(0)
  amountAvailable: number;

  @Validate(CostValidator)
  cost: number;
}
