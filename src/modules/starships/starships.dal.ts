import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_STARSHIPS_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class StarshipsDataAccessLayer {
  private logger = new Logger(StarshipsDataAccessLayer.name);

  public async getStarships(
    page: number,
    limit: number,
    name: string,
    model: string,
  ) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const starshipsRoute = this.getStarshipsRoute(page, limit, name, model);
      const response = await API.get(starshipsRoute);

      result = response.data;
      // TODO - change previous/next page link);
    } catch (err) {
      this.logger.error(err);
      console.log(err);
      result = err.message;
    }

    return result;
  }

  private getStarshipsRoute = (
    page: number,
    limit: number,
    name?: string,
    model?: string,
  ) =>
    SWAPI_STARSHIPS_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
      { name: 'model', value: model },
    ]);

  public async getStarship(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_STARSHIPS_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}
