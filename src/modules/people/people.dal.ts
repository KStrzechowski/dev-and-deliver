import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_PEOPLE_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class PeopleDataAccessLayer {
  private logger = new Logger(PeopleDataAccessLayer.name);

  public async getPeople(page: number, limit: number, name?: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const peopleRoute = this.getPeopleRoute(page, limit, name);
      const response = await API.get(peopleRoute);

      return response.data;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  private getPeopleRoute = (page: number, limit: number, name?: string) =>
    SWAPI_PEOPLE_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
    ]);

  public async getPerson(id: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PEOPLE_ROUTE + id);

      return response.data.result;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
