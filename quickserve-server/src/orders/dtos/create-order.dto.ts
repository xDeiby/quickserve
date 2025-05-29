import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  tableId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

export class CreateOrderItemDto {
  @IsString()
  menuItemId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
