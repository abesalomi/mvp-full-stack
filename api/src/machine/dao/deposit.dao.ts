import { Validate } from 'class-validator';
import { DepositAmountValidator } from '../../user/validation/deposit-amount.validator';


export class DepositDao {

  @Validate(DepositAmountValidator)
  deposit: number;

}
