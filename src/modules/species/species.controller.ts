import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { GetSpecieParamsDto, GetSpeciesQueryDto } from './dtos';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get('/')
  async getSpecies(@Query() query: GetSpeciesQueryDto) {
    return await this.speciesService.getSpecies(query);
  }

  @Get('/:id')
  async getSpecie(@Param() params: GetSpecieParamsDto) {
    return await this.speciesService.getSpecie(params);
  }
}
