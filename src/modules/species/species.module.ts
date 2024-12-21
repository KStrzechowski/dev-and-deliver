import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SpeciesDataAccessLayer } from './species.dal';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService, SpeciesDataAccessLayer],
  exports: [SpeciesDataAccessLayer],
})
export class SpeciesModule {}
