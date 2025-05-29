import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Order, OrderStatus } from 'prisma/generated/prisma-client';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly ordersSevice: OrdersService) {}

  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(OrdersGateway.name);

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('orders')
  async handleOrders(client: Socket) {
    const orders = await this.ordersSevice.findAll();

    this.logger.log(`Emitting orders to client: ${client.id}`);
    client.emit('orders', orders);
  }

  public emitOrderStatus(orderId: string, status: OrderStatus) {
    this.logger.log(`Emitting order status: ${orderId} - ${status}`);

    this.server.emit('orderStatus', {
      orderId,
      status,
    });
  }

  public emitOrders(orders: Order[]) {
    this.logger.log(`Emitting orders: ${JSON.stringify(orders)}`);

    this.server.emit('orders', orders);
  }
}
