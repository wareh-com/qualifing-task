// tslint:disable-next-line:no-import-side-effect
import 'isomorphic-unfetch';
import { ApiError, queryParamsObjectToQueryString } from './models';

export function get<T>(
  url: string,
  queryObject?: { [key: string]: number | string } | any,
): Promise<T> {
  const addressWithQuery = queryObject ?
    url + queryParamsObjectToQueryString(queryObject) :
    url;
  return apiQuery(addressWithQuery, undefined, 'GET');
}

async function apiQuery(
  url: string, body: object | undefined, method: 'POST' | 'GET' | 'PUT' | 'DELETE', parse: boolean = true,
): Promise<any> {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cache: 'no-cache',
    };
    const response = body ? await fetch(url, {
      body: JSON.stringify(body),
      headers,
      method,
      credentials: 'include',
    }) : await fetch(url, {
      headers,
      method,
      credentials: 'include',
    });
    if (parse) {
      const json = await response.json();
      if (response.status !== 200 && json.detail) {
        throw {
          status: response.status,
          message: json.detail,
        };
      } else if (response.status !== 200) {
        throw {
          status: response.status,
          message: ApiError.UNRECOGNIZED_ERROR,
        };
      }
      return json;
    } else {
      if (response.status !== 200) {
        throw {
          status: response.status,
          message: ApiError.UNRECOGNIZED_ERROR,
        };
      }
      return;
    }
  } catch (error) {
    throw {
      status: error.status,
      message: error.message,
    };
  }
}
