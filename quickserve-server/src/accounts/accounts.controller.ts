import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { Role } from 'prisma/generated/prisma-client';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('create')
  @UseGuards(AuthenticatedGuard([Role.ADMIN]))
  async createAccount(@Body() accountDto: CreateAccountDto) {
    return this.accountsService.createAccount(accountDto);
  }
}
