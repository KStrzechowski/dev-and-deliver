import { Injectable } from '@nestjs/common';
import { SpeciesDataAccessLayer } from './species.dal';
import { GetSpecieParamsDto, GetSpeciesQueryDto } from './dtos';

@Injectable()
export class SpeciesService {
  constructor(
    private readonly speciesDataAccessLayer: SpeciesDataAccessLayer,
  ) {}

  public async getSpecies(query: GetSpeciesQueryDto) {
    const { page, limit, name } = query;

    return await this.speciesDataAccessLayer.getSpecies(page, limit, name);
  }

  public async getSpecie(params: GetSpecieParamsDto) {
    const { id } = params;

    return await this.speciesDataAccessLayer.getSpecie(id);
  }
}
