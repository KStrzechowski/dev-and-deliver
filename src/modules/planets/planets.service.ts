import { Injectable } from '@nestjs/common';
import { PlanetsDataAccessLayer } from './planets.dal';
import { GetPlanetParamsDto, GetPlanetsQueryDto } from './dtos';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly planetsDataAccessLayer: PlanetsDataAccessLayer,
  ) {}

  public async getPlanets(query: GetPlanetsQueryDto) {
    const { page, limit, name } = query;

    return await this.planetsDataAccessLayer.getPlanets(page, limit, name);
  }

  public async getPlanet(params: GetPlanetParamsDto) {
    const { id } = params;

    return await this.planetsDataAccessLayer.getPlanet(id);
  }
}
