import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { GetPeopleQueryDto, GetPersonParamsDto } from './dtos';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('/')
  async getPeople(@Query() query: GetPeopleQueryDto) {
    return await this.peopleService.getPeople(query);
  }

  @Get('/:id')
  async getPerson(@Param() params: GetPersonParamsDto) {
    return await this.peopleService.getPerson(params);
  }
}
