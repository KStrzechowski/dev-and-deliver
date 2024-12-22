import { ConfigModule } from 'nestjs-config';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { resolve } from 'path';
import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { SpeciesModule } from './modules/species/species.module';
import { StarshipsModule } from './modules/starships/starships.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { PeopleModule } from './modules/people/people.module';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
      },
    ),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 3600 * 24,
    }),
    FilmsModule,
    PeopleModule,
    PlanetsModule,
    SpeciesModule,
    StarshipsModule,
    VehiclesModule,
  ],
})
export class AppModule {}
