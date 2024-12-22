import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { GetStarshipParamsDto, GetStarshipsQueryDto } from './dtos';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get('/')
  async getStarships(@Query() query: GetStarshipsQueryDto) {
    return await this.starshipsService.getStarships(query);
  }

  @Get('/:id')
  async getStarship(@Param() params: GetStarshipParamsDto) {
    return await this.starshipsService.getStarship(params);
  }
}
