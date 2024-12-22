import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_PLANETS_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';
import { Planet } from './planets.entity';
import { ResponsePaginated, ResponseResource } from 'src/types';

export class PlanetsDataAccessLayer {
  private logger = new Logger(PlanetsDataAccessLayer.name);

  public async getPlanets(page: number, limit: number, name?: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const planetsRoute = this.getPlanetsRoute(page, limit, name);
      const response = await API.get(planetsRoute);

      return response.data as ResponsePaginated;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  private getPlanetsRoute = (page: number, limit: number, name?: string) =>
    SWAPI_PLANETS_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
    ]);

  public async getPlanet(id: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PLANETS_ROUTE + id);

      return response.data.result as ResponseResource<Planet>;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
