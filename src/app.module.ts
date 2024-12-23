import { ConfigModule } from 'nestjs-config';
import { Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'redis', // TODO - use env
            port: 6379,
          },
          ttl: 1000 * 3600 * 24,
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
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
