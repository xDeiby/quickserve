import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTableDto } from './dtos/create-table.dto';
import { TableStatus } from 'prisma/generated/prisma-client';

@Injectable()
export class TablesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTable(data: CreateTableDto) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    return this.prismaService.table.create({
      data: {
        code,
        capacity: data.capacity,
        status: data.status,
      },
    });
  }

  async updateTableStatus(id: string, status: TableStatus) {
    const updatedTable = await this.prismaService.table.update({
      where: { id },
      data: { status },
    });

    return updatedTable;
  }

  async findAll() {
    return this.prismaService.table.findMany({
      include: {
        orders: true,
      },
    });
  }
}
