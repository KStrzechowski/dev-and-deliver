import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_SPECIES_ROUTE, SWAPI_URL } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class SpeciesDataAccessLayer {
  private logger = new Logger(SpeciesDataAccessLayer.name);

  public async getSpecies(page: number, limit: number, name: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const speciesRoute = this.getSpeciesRoute(page, limit, name);
      const response = await API.get(speciesRoute);

      result = response.data;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

  private getSpeciesRoute = (page: number, limit: number, name?: string) =>
    SWAPI_SPECIES_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
    ]);

  public async getSpecie(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_SPECIES_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}
