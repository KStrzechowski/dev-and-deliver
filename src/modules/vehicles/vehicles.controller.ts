import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { GetVehicleParamsDto, GetVehiclesQueryDto } from './dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/')
  async getVehicles(@Query() query: GetVehiclesQueryDto) {
    return await this.vehiclesService.getVehicles(query);
  }

  @Get('/:id')
  async getVehicle(@Param() params: GetVehicleParamsDto) {
    return await this.vehiclesService.getVehicle(params);
  }
}
