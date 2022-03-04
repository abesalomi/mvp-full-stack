import { MinLength } from 'class-validator';


export class UserUpdateDao {
  @MinLength(2, {
    message: 'First name should be longer then 2'
  })
  firstName: string;

  @MinLength(2, {
    message: 'Last name should be longer then 2'
  })
  lastName: string
}
