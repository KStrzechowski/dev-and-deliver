import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_SPECIES_ROUTE, SWAPI_URL } from 'src/constants';

export class SpeciesDataAccessLayer {
  private logger = new Logger(SpeciesDataAccessLayer.name);

  public async getSpecies(page: number, limit: number) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(
        `${SWAPI_SPECIES_ROUTE}?page=${page}&limit=${limit}`,
      );

      result = response.data;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

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
