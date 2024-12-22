import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PlanetsDataAccessLayer } from './planets.dal';
import { GetPlanetParamsDto, GetPlanetsQueryDto } from './dtos';
import { requestToKey } from 'src/helpers';
import { ResponsePaginated } from 'src/types';
import { Planet } from './planets.entity';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly planetsDataAccessLayer: PlanetsDataAccessLayer,
  ) {}

  public async getPlanets(
    query: GetPlanetsQueryDto,
  ): Promise<ResponsePaginated> {
    const cacheKey = requestToKey('/planets', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponsePaginated;
    if (cacheResult) {
      return cacheResult;
    }

    const { page, limit, name } = query;

    const result = await this.planetsDataAccessLayer.getPlanets(
      page,
      limit,
      name,
    );
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getPlanet(params: GetPlanetParamsDto): Promise<Planet> {
    const cacheKey = requestToKey('/planets', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Planet;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource = await this.planetsDataAccessLayer.getPlanet(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }
}
