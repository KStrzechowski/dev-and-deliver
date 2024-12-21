import { Injectable } from '@nestjs/common';
import { PlanetsDataAccessLayer } from './planets.dal';
import { GetPlanetsQueryDto } from './dtos';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly planetsDataAccessLayer: PlanetsDataAccessLayer,
  ) {}

  public async getPlanets(query: GetPlanetsQueryDto) {
    const {} = query;

    return await this.planetsDataAccessLayer.getPlanets();
  }
}
