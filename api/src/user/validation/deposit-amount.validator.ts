import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

const ALLOWED_DEPOSIT = [5, 10, 20, 50, 100];
@ValidatorConstraint({name: 'deposit', async: false})
export class DepositAmountValidator implements ValidatorConstraintInterface {

  private allowedAmountsSet: Set<number>;
  private allowedAmountsStr: string;

  constructor() {
    this.allowedAmountsSet = new Set(ALLOWED_DEPOSIT);
    this.allowedAmountsStr = ALLOWED_DEPOSIT.join();
  }

  validate(deposit: number, args: ValidationArguments) {
    return this.allowedAmountsSet.has(deposit);
  }

  defaultMessage(args: ValidationArguments) {
    return `Deposit value should be one of ${this.allowedAmountsStr}`;
  }
}
