import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    AccountsModule,
    TablesModule,
    OrdersModule,
    MenuItemsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        retryStrategy: (times) => {
          if (times > 3) {
            return null; // Stop retrying after 3 attempts
          }
          return Math.min(times * 50, 2000); // Exponential backoff
        },
      },
    }),
    EventEmitterModule.forRoot(),
    SessionsModule,
  ],
})
export class AppModule {}
