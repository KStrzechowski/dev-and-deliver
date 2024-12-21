import { Controller, Get, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { GetVehiclesQueryDto } from './dtos';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/')
  async getVehicles(@Query() query: GetVehiclesQueryDto) {
    return await this.vehiclesService.getVehicles(query);
  }
}
