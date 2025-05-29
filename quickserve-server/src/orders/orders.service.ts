import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { PrismaService } from 'src/common/prisma.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderStatus, Prisma } from 'prisma/generated/prisma-client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectQueue('orders') private ordersQueue: Queue,
  ) {}

  async createOrder(orderDto: CreateOrderDto) {
    const waiterId = '6801364ecf4ffe8f78b32f72';

    const job = await this.ordersQueue.add('order', {
      waiterId,
      orderDto,
    });

    return {
      jobId: job.id,
      status: OrderStatus.PENDING,
      message: 'Order is being processed',
    };
  }

  async create(order: Prisma.OrderCreateInput) {
    return this.prismaService.order.create({
      data: order,
    });
  }

  async findAll() {
    return this.prismaService.order.findMany();
  }
}
