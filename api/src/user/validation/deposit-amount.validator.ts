import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ALLOWED_CHANGE } from '../../constants/change.constant';



@ValidatorConstraint({name: 'deposit', async: false})
export class DepositAmountValidator implements ValidatorConstraintInterface {

  private allowedAmountsSet: Set<number>;
  private allowedAmountsStr: string;

  constructor() {
    this.allowedAmountsSet = new Set(ALLOWED_CHANGE);
    this.allowedAmountsStr = ALLOWED_CHANGE.join();
  }

  validate(deposit: number, args: ValidationArguments) {
    return this.allowedAmountsSet.has(deposit);
  }

  defaultMessage(args: ValidationArguments) {
    return `Deposit value should be one of ${this.allowedAmountsStr}`;
  }
}
