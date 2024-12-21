import { Injectable } from '@nestjs/common';
import { PeopleDataAccessLayer } from './people.dal';
import { GetPeopleQueryDto, GetPersonParamsDto } from './dtos';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleDataAccessLayer: PeopleDataAccessLayer) {}

  public async getPeople(query: GetPeopleQueryDto) {
    const { page, limit } = query;

    return await this.peopleDataAccessLayer.getPeople(page, limit);
  }

  public async getPerson(params: GetPersonParamsDto) {
    const { id } = params;

    return await this.peopleDataAccessLayer.getPerson(id);
  }
}
