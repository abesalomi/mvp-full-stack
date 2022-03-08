import { ALLOWED_CHANGE } from '../constants/change.constant';


export const calculateChange = (amount, changes = ALLOWED_CHANGE): Record<string, number> => {

  let remainingAmount = amount;
  const result = {};

  for (const change of changes) {
    result[change] = Math.floor(remainingAmount / change);
    remainingAmount %= change;
  }

  return result;
}

