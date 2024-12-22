import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PeopleDataAccessLayer } from './people.dal';
import { GetPeopleQueryDto, GetPersonParamsDto } from './dtos';
import { requestToKey } from 'src/helpers';
import { ResponsePaginated } from 'src/types';
import { People } from './people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly peopleDataAccessLayer: PeopleDataAccessLayer,
  ) {}

  public async getPeople(query: GetPeopleQueryDto): Promise<ResponsePaginated> {
    const cacheKey = requestToKey('/people', query);
    const cacheResult = (await this.cacheManager.get(
      cacheKey,
    )) as ResponsePaginated;
    if (cacheResult) {
      return cacheResult;
    }

    const { page, limit, name } = query;

    const result = await this.peopleDataAccessLayer.getPeople(
      page,
      limit,
      name,
    );
    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  public async getPerson(params: GetPersonParamsDto): Promise<People> {
    const cacheKey = requestToKey('/people', params);
    const cacheResult = (await this.cacheManager.get(cacheKey)) as People;
    if (cacheResult) {
      return cacheResult;
    }

    const { id } = params;

    const responseResource = await this.peopleDataAccessLayer.getPerson(id);
    await this.cacheManager.set(cacheKey, responseResource.properties);

    return responseResource.properties;
  }
}
