import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesDataAccessLayer } from './vehicles.dal';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesDataAccessLayer],
  exports: [VehiclesDataAccessLayer],
})
export class VehiclesModule {}
