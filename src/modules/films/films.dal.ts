import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_FILMS_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class FilmsDataAccessLayer {
  private logger = new Logger(FilmsDataAccessLayer.name);

  public async getFilms(title?: string) {
    let result;

    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const filmsRoute = this.getFilmsRoute(title);
      console.log(filmsRoute);
      const response = await API.get(filmsRoute);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

  private getFilmsRoute = (title?: string) =>
    SWAPI_FILMS_ROUTE + createRequestQuery([{ name: 'title', value: title }]);

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
