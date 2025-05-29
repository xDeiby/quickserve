import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(accountDto: CreateAccountDto) {
    accountDto.password = bcrypt.hashSync(accountDto.password, 10);

    const account = await this.prismaService.user.create({
      data: accountDto,
      omit: { password: true },
    });

    return account;
  }

  async findAccountByEmail(email: string) {
    const account = await this.prismaService.user.findUnique({
      where: { email },
    });

    return account;
  }
}
