import keys from 'lodash/keys';

export enum ApiError {
  UNRECOGNIZED_ERROR = 'Unrecognized',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
}

export type RequestError = {
  status: number;
  message: ApiError;
};

export function queryParamsObjectToQueryString(queryObject: { [key: string]: any }): string {
  const queryObjectKeys = keys(queryObject);
  return queryObjectKeys.reduce(
    (acc, key, i) => {
      acc += `${key}=${queryObject[key]}${i !== queryObjectKeys.length - 1 ? '&' : ''}`;
      return acc;
    },
    '?'
  );
}
