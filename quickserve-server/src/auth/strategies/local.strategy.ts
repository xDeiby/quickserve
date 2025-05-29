import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { plainToInstance } from 'class-transformer';
import { CredentialsDto } from '../dtos/credentials.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const validatedCredentials = plainToInstance(CredentialsDto, {
      email,
      password,
    });
    const errors = validateSync(validatedCredentials);

    if (errors.length) throw new BadRequestException(errors);

    const user = this.authService.validateCredentials({ email, password });

    return user;
  }
}
