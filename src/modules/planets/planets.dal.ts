import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_PLANETS_ROUTE, SWAPI_URL } from 'src/constants';

export class PlanetsDataAccessLayer {
  private logger = new Logger(PlanetsDataAccessLayer.name);

  public async getPlanets() {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PLANETS_ROUTE);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

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
