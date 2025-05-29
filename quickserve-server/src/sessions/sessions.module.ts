import { INestApplication, Module } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionSerializer } from './session.serializer';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  providers: [SessionSerializer],
  imports: [AccountsModule],
})
export class SessionsModule {
  public static configure(app: INestApplication) {
    app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,

        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          secure: false, // Set to true if using HTTPS
          httpOnly: true,
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
  }
}
