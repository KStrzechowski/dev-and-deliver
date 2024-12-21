import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { PlanetsDataAccessLayer } from './planets.dal';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService, PlanetsDataAccessLayer],
  exports: [PlanetsDataAccessLayer],
})
export class PlanetsModule {}
