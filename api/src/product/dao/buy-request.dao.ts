import { IsNotEmpty, Min } from 'class-validator';

export class BuyRequestDao {

  @IsNotEmpty()
  productId: number;

  @Min(1, {
    message: "Amount should be at least 1"
  })
  amount: number;

}
