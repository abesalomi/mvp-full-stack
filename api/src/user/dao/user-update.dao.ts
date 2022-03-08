import { IsOptional, MinLength } from 'class-validator';


export class UserUpdateDao {
  @IsOptional()
  @MinLength(4)
  username?: string;


  @IsOptional()
  @MinLength(8)
  password?: string
}
