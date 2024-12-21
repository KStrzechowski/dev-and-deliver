import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { StarshipsDataAccessLayer } from './starships.dal';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService, StarshipsDataAccessLayer],
  exports: [StarshipsDataAccessLayer],
})
export class StarshipsModule {}
