import { Injectable } from '@nestjs/common';
import { SpeciesDataAccessLayer } from './species.dal';
import { GetSpeciesQueryDto } from './dtos';

@Injectable()
export class SpeciesService {
  constructor(
    private readonly speciesDataAccessLayer: SpeciesDataAccessLayer,
  ) {}

  public async getSpecies(query: GetSpeciesQueryDto) {
    const {} = query;

    return await this.speciesDataAccessLayer.getSpecies();
  }
}
