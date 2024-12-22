import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsDataAccessLayer } from './films.dal';
import { PeopleModule } from '../people/people.module';

@Module({
  imports: [PeopleModule],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsDataAccessLayer],
  exports: [FilmsDataAccessLayer],
})
export class FilmsModule {}
