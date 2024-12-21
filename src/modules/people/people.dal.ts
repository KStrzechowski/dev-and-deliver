import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_PEOPLE_ROUTE, SWAPI_URL } from 'src/constants';

export class PeopleDataAccessLayer {
  private logger = new Logger(PeopleDataAccessLayer.name);

  public async getPeople() {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PEOPLE_ROUTE);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

  public async getPerson(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_PEOPLE_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}