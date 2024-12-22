import { Injectable } from '@nestjs/common';
import { PeopleDataAccessLayer } from './people.dal';
import { GetPeopleQueryDto, GetPersonParamsDto } from './dtos';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleDataAccessLayer: PeopleDataAccessLayer) {}

  public async getPeople(query: GetPeopleQueryDto) {
    const { page, limit, name } = query;

    return await this.peopleDataAccessLayer.getPeople(page, limit, name);
  }

  public async getPerson(params: GetPersonParamsDto) {
    const { id } = params;

    const responseResource = await this.peopleDataAccessLayer.getPerson(id);

    return responseResource.properties;
  }
}
