import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { PeopleDataAccessLayer } from './people.dal';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, PeopleDataAccessLayer],
  exports: [PeopleDataAccessLayer],
})
export class PeopleModule {}
