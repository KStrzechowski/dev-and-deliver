import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SpeciesDataAccessLayer } from './species.dal';
import { GetSpecieParamsDto, GetSpeciesQueryDto } from './dtos';
import { requestToKey } from 'src/helpers';
import { ResponsePaginated } from 'src/types';
import { Specie } from './species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly speciesDataAccessLayer: SpeciesDataAccessLayer,
  ) {}

  public async getSpecies(
    query: GetSpeciesQueryDto,
  ): Promise<ResponsePaginated> {
    const cacheKey = requestToKey('/species', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponsePaginated;
    if (cacheResult) {
      return cacheResult;
    }

    const { page, limit, name } = query;

    const result = await this.speciesDataAccessLayer.getSpecies(
      page,
      limit,
      name,
    );
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getSpecie(params: GetSpecieParamsDto): Promise<Specie> {
    const cacheKey = requestToKey('/species', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Specie;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource = await this.speciesDataAccessLayer.getSpecie(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }
}
