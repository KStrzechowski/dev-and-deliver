import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarshipsModule } from './modules/starships/starships.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
      },
    ),
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
  ],
})
export class AppModule {}
