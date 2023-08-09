import { Length, IsNotEmpty, IsString, Min, IsInt } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  // @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;
}
