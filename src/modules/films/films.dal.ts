import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_FILMS_ROUTE, SWAPI_URL } from 'src/constants';

export class FilmsDataAccessLayer {
  private logger = new Logger(FilmsDataAccessLayer.name);

  public async getFilms() {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_FILMS_ROUTE);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

  public async getFilm(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_FILMS_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}
