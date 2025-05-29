import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  category: string;
}
