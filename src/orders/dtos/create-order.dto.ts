import { Length, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  client: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  address: string;
}
