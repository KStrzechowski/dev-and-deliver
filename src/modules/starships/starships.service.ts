import { Injectable } from '@nestjs/common';
import { StarshipsDataAccessLayer } from './starships.dal';
import { GetStarshipParamsDto, GetStarshipsQueryDto } from './dtos';

@Injectable()
export class StarshipsService {
  constructor(
    private readonly starshipsDataAccessLayer: StarshipsDataAccessLayer,
  ) {}

  public async getStarships(query: GetStarshipsQueryDto) {
    const { page, limit, name, model } = query;

    return await this.starshipsDataAccessLayer.getStarships(
      page,
      limit,
      name,
      model,
    );
  }

  public async getStarship(params: GetStarshipParamsDto) {
    const { id } = params;

    const responseResource =
      await this.starshipsDataAccessLayer.getStarship(id);

    return responseResource.properties;
  }
}
