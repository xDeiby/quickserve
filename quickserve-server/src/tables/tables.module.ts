import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TablesGateway } from './tables.gateway';

@Module({
  controllers: [TablesController],
  providers: [TablesService, TablesGateway],
})
export class TablesModule {}
