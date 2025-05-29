import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { TableStatus } from 'prisma/generated/prisma-client';

export class CreateTableDto {
  @IsInt()
  @IsPositive()
  capacity: number;

  @IsEnum(TableStatus)
  status: TableStatus;
}
