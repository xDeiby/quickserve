import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'prisma/generated/prisma-client';
import { AccountsService } from 'src/accounts/accounts.service';

type DoneFn<T> = (err: Error | null, user: T | null) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly accountsService: AccountsService) {
    super();
  }

  serializeUser(user: User, done: DoneFn<string>) {
    done(null, user.email);
  }
  async deserializeUser(payload: string, done: DoneFn<User>) {
    const user = await this.accountsService.findAccountByEmail(payload);

    if (!user) done(new Error('User not found'), null);

    done(null, user);
  }
}
