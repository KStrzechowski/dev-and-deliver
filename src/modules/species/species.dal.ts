import { HttpException, Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_SPECIES_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class SpeciesDataAccessLayer {
  private logger = new Logger(SpeciesDataAccessLayer.name);

  public async getSpecies(page: number, limit: number, name?: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const speciesRoute = this.getSpeciesRoute(page, limit, name);
      const response = await API.get(speciesRoute);

      return response.data;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }

  private getSpeciesRoute = (page: number, limit: number, name?: string) =>
    SWAPI_SPECIES_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
    ]);

  public async getSpecie(id: string) {
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_SPECIES_ROUTE + id);

      return response.data.result;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response.data, err.response.status);
    }
  }
}
