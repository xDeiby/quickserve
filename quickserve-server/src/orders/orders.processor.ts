import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MenuItemsService } from 'src/menu-items/menu-items.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order, Prisma, TableStatus } from 'prisma/generated/prisma-client';
import { BadRequestException, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

type CreateOrderJobData = {
  waiterId: string;
  orderDto: CreateOrderDto;
};

@Processor('orders')
export class OrderProcessor extends WorkerHost {
  private readonly logger = new Logger(OrderProcessor.name);

  constructor(
    private readonly orderService: OrdersService,
    private readonly eventEmitter: EventEmitter2,
    private readonly menuItemsService: MenuItemsService,
  ) {
    super();
  }

  async process(job: Job<CreateOrderJobData, Order>) {
    const { waiterId, orderDto } = job.data;

    const menuItems = await this.menuItemsService.getMenuItems(
      orderDto.items.map((item) => item.menuItemId),
    );

    const orderItems: Prisma.OrderItemCreateInput[] = orderDto.items.map(
      (item) => {
        const menuItem = menuItems.find(
          (menuItem) => menuItem.id === item.menuItemId,
        );

        if (!menuItem) {
          throw new BadRequestException(
            `Menu item with ID ${item.menuItemId} not found`,
          );
        }

        return {
          menuItemId: menuItem.id,
          quantity: item.quantity,
          unitPrice: menuItem.price,
        };
      },
    );

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );

    const orderCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const order = await this.orderService.create({
      waiter: { connect: { id: waiterId } },
      table: { connect: { id: orderDto.tableId } },
      code: orderCode,
      totalAmount,
      items: orderItems,
    });

    this.eventEmitter.emit('order.created');
    this.eventEmitter.emit('tables.updated', {
      tableId: orderDto.tableId,
      status: TableStatus.OCCUPIED,
    });

    return order;
  }

  onError(error: Error) {
    console.error('Error processing job:', error);
  }
}
