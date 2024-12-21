import { Injectable } from '@nestjs/common';
import { StarshipsDataAccessLayer } from './starships.dal';
import { GetStarshipParamsDto, GetStarshipsQueryDto } from './dtos';

@Injectable()
export class StarshipsService {
  constructor(
    private readonly starshipsDataAccessLayer: StarshipsDataAccessLayer,
  ) {}

  public async getStarships(query: GetStarshipsQueryDto) {
    const {} = query;

    return await this.starshipsDataAccessLayer.getStarships();
  }

  public async getStarship(params: GetStarshipParamsDto) {
    const { id } = params;

    return await this.starshipsDataAccessLayer.getStarship(id);
  }
}
