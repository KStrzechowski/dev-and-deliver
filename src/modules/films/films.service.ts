import { Injectable } from '@nestjs/common';
import { FilmsDataAccessLayer } from './films.dal';
import { GetFilmsQueryDto } from './dtos';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsDataAccessLayer: FilmsDataAccessLayer) {}

  public async getFilms(query: GetFilmsQueryDto) {
    const {} = query;

    return await this.filmsDataAccessLayer.getFilms();
  }
}
