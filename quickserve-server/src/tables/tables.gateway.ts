import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Table } from 'prisma/generated/prisma-client';
import { Server, Socket } from 'socket.io';
import { TablesService } from './tables.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class TablesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  private logger: Logger;

  constructor(private readonly tablesService: TablesService) {
    this.logger = new Logger(TablesGateway.name);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('tables')
  async handleTables(client: Socket) {
    const tables = await this.tablesService.findAll();

    client.emit('tables', tables);

    this.logger.log(
      `Emitting tables to client ${client.id}: ${JSON.stringify(tables)}`,
    );
  }

  emitTables(tables: Table[]) {
    this.logger.log(`Emitting tables: ${JSON.stringify(tables)}`);

    this.server.emit('tables', tables);
  }
}
