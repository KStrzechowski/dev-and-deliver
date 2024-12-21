import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_PLANETS_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class PlanetsDataAccessLayer {
  private logger = new Logger(PlanetsDataAccessLayer.name);

  public async getPlanets(page: number, limit: number, name: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const planetsRoute = this.getPlanetsRoute(page, limit, name);
      const response = await API.get(planetsRoute);

      result = response.data;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

  private getPlanetsRoute = (page: number, limit: number, name?: string) =>
    SWAPI_PLANETS_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
    ]);

  public async getPlanet(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PLANETS_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}
