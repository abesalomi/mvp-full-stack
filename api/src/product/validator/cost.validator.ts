import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({name: 'cost', async: false})
export class CostValidator implements ValidatorConstraintInterface {

  validate(cost: number, args: ValidationArguments) {
    return cost % 5 === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Cost should be dividable by 5';
  }
}
