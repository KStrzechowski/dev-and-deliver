import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { GetFilmsQueryDto, GetFilmParamsDto } from './dtos';
import { WordOccurrence } from 'src/types';

@ApiTags('Films')
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
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of pairs of unique words from all film openings with their number of occurences.',
    type: [WordOccurrence],
  })
  async getWordsInOpenings() {
    return await this.filmsService.getWordsInOpenings();
  }

  @Get('/opening/people')
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of character names that appeared most frequently in all the opening credits of the films.',
    type: [String],
  })
  async getMostPopularPeopleInOpenings() {
    return await this.filmsService.getMostPopularPeopleInOpenings();
  }
}
