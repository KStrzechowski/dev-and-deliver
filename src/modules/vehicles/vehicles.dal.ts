import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SWAPI_URL, SWAPI_VEHICLES_ROUTE } from 'src/constants';

export class VehiclesDataAccessLayer {
  private logger = new Logger(VehiclesDataAccessLayer.name);

  public async getVehicles(page: number, limit: number) {
    let result;
    try {
      const API = axios.create({
        baseURL: SWAPI_URL,
      });

      const response = await API.get(
        `${SWAPI_VEHICLES_ROUTE}?page=${page}&limit=${limit}`,
      );

      result = response.data;
      // TODO - change previous/next page link
    } catch (err) {
      this.logger.error(err);
      result = err.message;
    }

    return result;
  }

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
