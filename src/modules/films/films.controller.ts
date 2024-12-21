import { Controller, Get, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsQueryDto } from './dtos';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async getFilms(@Query() query: GetFilmsQueryDto) {
    return await this.filmsService.getFilms(query);
  }
}
