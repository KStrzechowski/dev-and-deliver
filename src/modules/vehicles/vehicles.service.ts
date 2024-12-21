import { Injectable } from '@nestjs/common';
import { VehiclesDataAccessLayer } from './vehicles.dal';
import { GetVehiclesQueryDto } from './dtos';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehiclesDataAccessLayer: VehiclesDataAccessLayer,
  ) {}

  public async getVehicles(query: GetVehiclesQueryDto) {
    const {} = query;

    return await this.vehiclesDataAccessLayer.getVehicles();
  }
}
