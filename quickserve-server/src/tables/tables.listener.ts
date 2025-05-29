import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TablesService } from './tables.service';
import { TablesGateway } from './tables.gateway';
import { TableStatus } from 'prisma/generated/prisma-client';

@Injectable()
export class OrdersListener {
  constructor(
    private readonly tablesService: TablesService,
    private readonly tablesGateway: TablesGateway,
  ) {}

  @OnEvent('tables.updated')
  async handleOrderCreated(event: { tableId: string; status: TableStatus }) {
    const { tableId, status } = event;

    await this.tablesService.updateTableStatus(tableId, status);

    const tables = await this.tablesService.findAll();

    this.tablesGateway.emitTables(tables);
  }
}
