import { Injectable } from '@nestjs/common';
import { VehiclesDataAccessLayer } from './vehicles.dal';
import { GetVehicleParamsDto, GetVehiclesQueryDto } from './dtos';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehiclesDataAccessLayer: VehiclesDataAccessLayer,
  ) {}

  public async getVehicles(query: GetVehiclesQueryDto) {
    const {} = query;

    return await this.vehiclesDataAccessLayer.getVehicles();
  }

  public async getVehicle(params: GetVehicleParamsDto) {
    const { id } = params;

    return await this.vehiclesDataAccessLayer.getVehicle(id);
  }
}
