import { Length, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  client: string;

  @IsNotEmpty()
  @IsString()
  // @Length(5, 30)
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  address: string;
}
