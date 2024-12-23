import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_FILMS_ROUTE, SWAPI_URL } from '../../constants';
import { createRequestQuery } from '../../helpers';
import { ResponseResource } from '../../types';
import { Film } from './films.entity';

export class FilmsDataAccessLayer {
  private logger = new Logger(FilmsDataAccessLayer.name);

  public async getFilms(title?: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const filmsRoute = this.getFilmsRoute(title);
      const response = await API.get(filmsRoute);

      return response.data.result as ResponseResource<Film>[];
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  private getFilmsRoute = (title?: string) =>
    SWAPI_FILMS_ROUTE + createRequestQuery([{ name: 'title', value: title }]);

  public async getFilm(id: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_FILMS_ROUTE + id);

      return response.data.result as ResponseResource<Film>;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
