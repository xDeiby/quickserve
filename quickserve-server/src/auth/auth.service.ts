import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CredentialsDto } from './dtos/credentials.dto';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  async validateCredentials(credentialsDto: CredentialsDto) {
    const user = await this.accountsService.findAccountByEmail(
      credentialsDto.email,
    );

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const matchPassword = bcrypt.compareSync(
      credentialsDto.password,
      user?.password,
    );

    if (!matchPassword) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
