import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MenuItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMenuItem(menuItemDto: CreateMenuItemDto) {
    return this.prismaService.menuItem.create({ data: menuItemDto });
  }

  async getMenuItems(itemsIds?: string[]) {
    return this.prismaService.menuItem.findMany({
      ...(itemsIds && { where: { id: { in: itemsIds } } }),
    });
  }
}
