import { Injectable } from '@nestjs/common';
import { VehiclesDataAccessLayer } from './vehicles.dal';
import { GetVehicleParamsDto, GetVehiclesQueryDto } from './dtos';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehiclesDataAccessLayer: VehiclesDataAccessLayer,
  ) {}

  public async getVehicles(query: GetVehiclesQueryDto) {
    const { page, limit, name, model } = query;

    return await this.vehiclesDataAccessLayer.getVehicles(
      page,
      limit,
      name,
      model,
    );
  }

  public async getVehicle(params: GetVehicleParamsDto) {
    const { id } = params;

    const responseResource = await this.vehiclesDataAccessLayer.getVehicle(id);

    return responseResource.properties;
  }
}
