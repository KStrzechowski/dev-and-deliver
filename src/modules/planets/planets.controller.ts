import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { GetPlanetsQueryDto } from './dtos';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get('/')
  async getPlanets(@Query() query: GetPlanetsQueryDto) {
    return await this.planetsService.getPlanets(query);
  }
}
