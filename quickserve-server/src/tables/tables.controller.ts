import { Body, Controller, Get, Post } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dtos/create-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async createTable(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.createTable(createTableDto);
  }

  @Get()
  async getTables() {
    return this.tablesService.findAll();
  }
}
