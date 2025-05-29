import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';

@Injectable()
export class OrdersListener {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersGateway: OrdersGateway,
  ) {}

  @OnEvent('orders.created')
  async handleOrderCreated() {
    const orders = await this.ordersService.findAll();

    this.ordersGateway.emitOrders(orders);
  }
}
