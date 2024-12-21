import { QueryParam } from '../types';

export const createRequestQuery = (queryParams: QueryParam[]) => {
  let query = '';
  for (const param of queryParams) {
    if (param.value) {
      if (!query) query = `?${param.name}=${param.value}`;
      else query += `&${param.name}=${param.value}`;
    }
  }

  return query;
};
