import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsQueryDto, GetFilmParamsDto } from './dtos';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async getFilms(@Query() query: GetFilmsQueryDto) {
    return await this.filmsService.getFilms(query);
  }

  @Get('/:id')
  async getFilm(@Param() params: GetFilmParamsDto) {
    return await this.filmsService.getFilm(params);
  }

  @Get('/opening/words')
  async getWordsInOpenings() {
    return await this.filmsService.getWordsInOpenings();
  }

  @Get('/opening/people')
  async getMostPopularPeopleInOpenings() {
    return await this.filmsService.getMostPopularPeopleInOpenings();
  }
}
