import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { StarshipsDataAccessLayer } from './starships.dal';
import { GetStarshipParamsDto, GetStarshipsQueryDto } from './dtos';
import { requestToKey } from 'src/helpers';
import { ResponsePaginated } from 'src/types';
import { Starship } from './starships.entity';

@Injectable()
export class StarshipsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly starshipsDataAccessLayer: StarshipsDataAccessLayer,
  ) {}

  public async getStarships(
    query: GetStarshipsQueryDto,
  ): Promise<ResponsePaginated> {
    const cacheKey = requestToKey('/starships', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponsePaginated;
    if (cacheResult) {
      return cacheResult;
    }

    const { page, limit, name, model } = query;

    const result = this.starshipsDataAccessLayer.getStarships(
      page,
      limit,
      name,
      model,
    );
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getStarship(params: GetStarshipParamsDto): Promise<Starship> {
    const cacheKey = requestToKey('/starships', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as Starship;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource =
      await this.starshipsDataAccessLayer.getStarship(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }
}
