import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [AccountsModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
