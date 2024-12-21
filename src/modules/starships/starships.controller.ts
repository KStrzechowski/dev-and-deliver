import { Controller, Get, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { GetStarshipsQueryDto } from './dtos';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get('/')
  async getStarships(@Query() query: GetStarshipsQueryDto) {
    return await this.starshipsService.getStarships(query);
  }
}
