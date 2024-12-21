import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_URL, SWAPI_VEHICLES_ROUTE } from 'src/constants';
import { createRequestQuery } from 'src/helpers';

export class VehiclesDataAccessLayer {
  private logger = new Logger(VehiclesDataAccessLayer.name);

  public async getVehicles(
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
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
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
    SWAPI_VEHICLES_ROUTE +
    createRequestQuery([
      { name: 'page', value: String(page) },
      { name: 'limit', value: String(limit) },
      { name: 'name', value: name },
      { name: 'model', value: model },
    ]);

  public async getVehicle(id: string) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(SWAPI_VEHICLES_ROUTE + id);
      result = response.data.result;
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }
}
