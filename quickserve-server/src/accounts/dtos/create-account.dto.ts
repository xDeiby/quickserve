import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Role } from 'prisma/generated/prisma-client';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minSymbols: 0,
  })
  password: string;

  @IsEnum(Role)
  role: Role;
}
