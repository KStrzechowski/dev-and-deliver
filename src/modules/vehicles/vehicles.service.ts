import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { VehiclesDataAccessLayer } from './vehicles.dal';
import { GetVehicleParamsDto, GetVehiclesQueryDto } from './dtos';
import { requestToKey } from 'src/helpers';
import { Vehicle } from './vehicles.entity';
import { ResponsePaginated } from 'src/types';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly vehiclesDataAccessLayer: VehiclesDataAccessLayer,
  ) {}

  public async getVehicles(
    query: GetVehiclesQueryDto,
  ): Promise<ResponsePaginated> {
    const cacheKey = requestToKey('/vehicles', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponsePaginated;
    if (cacheResult) {
      return cacheResult;
    }

    const { page, limit, name, model } = query;

    const result = await this.vehiclesDataAccessLayer.getVehicles(
      page,
      limit,
      name,
      model,
    );
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getVehicle(params: GetVehicleParamsDto): Promise<Vehicle> {
    const cacheKey = requestToKey('/vehicles', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Vehicle;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource = await this.vehiclesDataAccessLayer.getVehicle(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }
}
