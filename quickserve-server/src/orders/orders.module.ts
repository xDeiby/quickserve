import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { BullModule } from '@nestjs/bullmq';
import { OrderProcessor } from './orders.processor';
import { OrdersQueueEventsListener } from './orders-queue-events.listener';
import { OrdersGateway } from './orders.gateway';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderProcessor,
    OrdersQueueEventsListener,
    OrdersGateway,
  ],
  imports: [
    MenuItemsModule,
    BullModule.registerQueue({
      name: 'orders',
    }),
  ],
})
export class OrdersModule {}
