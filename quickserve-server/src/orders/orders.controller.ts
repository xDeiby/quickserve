import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { Role } from 'prisma/generated/prisma-client';

@Controller('orders')
@UseGuards(AuthenticatedGuard([Role.ADMIN, Role.WAITER]))
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}
