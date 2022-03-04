import { Validate } from 'class-validator';
import { DepositAmountValidator } from '../validation/deposit-amount.validator';


export class DepositDao {

  @Validate(DepositAmountValidator)
  amount: number;

}
