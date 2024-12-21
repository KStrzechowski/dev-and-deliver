import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { GetPlanetParamsDto, GetPlanetsQueryDto } from './dtos';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get('/')
  async getPlanets(@Query() query: GetPlanetsQueryDto) {
    return await this.planetsService.getPlanets(query);
  }

  @Get('/:id')
  async getPlanet(@Param() params: GetPlanetParamsDto) {
    return await this.planetsService.getPlanet(params);
  }
}
