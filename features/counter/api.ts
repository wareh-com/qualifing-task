import { get } from 'features/api/api';
import { SwapiPlanetResponse } from './models';

export const getCounterFromSwapi = (): Promise<SwapiPlanetResponse> =>
  get<SwapiPlanetResponse>(
    'https://swapi.co/api/planets/3/',
  );
