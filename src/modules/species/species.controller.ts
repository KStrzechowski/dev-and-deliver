import { Controller, Get, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { GetSpeciesQueryDto } from './dtos';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get('/')
  async getSpecies(@Query() query: GetSpeciesQueryDto) {
    return await this.speciesService.getSpecies(query);
  }
}
