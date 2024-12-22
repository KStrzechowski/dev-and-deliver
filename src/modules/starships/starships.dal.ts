import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_STARSHIPS_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';
import { Starship } from './starships.entity';
import { ResponsePaginated, ResponseResource } from 'src/types';

export class StarshipsDataAccessLayer {
  private logger = new Logger(StarshipsDataAccessLayer.name);

  public async getStarships(
    page: number,
    limit: number,
    name?: string,
    model?: string,
  ) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const starshipsRoute = this.getStarshipsRoute(page, limit, name, model);
      const response = await API.get(starshipsRoute);

      return response.data as ResponsePaginated;
      // TODO - change previous/next page link);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
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
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_STARSHIPS_ROUTE + id);

      return response.data.result as ResponseResource<Starship>;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
