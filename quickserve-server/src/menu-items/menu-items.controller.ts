import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.createMenuItem(createMenuItemDto);
  }

  @Get()
  async getMenuItems() {
    return this.menuItemsService.getMenuItems();
  }
}
