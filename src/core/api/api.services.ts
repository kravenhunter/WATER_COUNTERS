/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAreaDTO, IMetterDTO, IResponse } from '@/core';
import { IArea, IMeter } from '@/modules';
import { convertAreasData, convertMetersData } from '@/modules/Meters/utils';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const config: AxiosRequestConfig = {
  timeout: 10000,
  timeoutErrorMessage: 'Timeout expired',
};
const BASE_URL =
  'http://showroom.eis24.me/api/v4/test/meters/?limit=20&offset=';
const BASE_URL_SINGLE =
  'http://showroom.eis24.me/api/v4/test/meters/?limit=1&offset=';
const REMOVE_URL = 'http://showroom.eis24.me/api/v4/test/meters';
export class ApiServices {
  static get<T>(url: string): Promise<T> {
    return axios
      .get(url, config)
      .then((res: AxiosResponse) => res.data as T)
      .catch((err: AxiosError) => {
        if (err.response) {
          throw err.response.data;
        }
        throw err;
      });
  }
  static async loadMeters(
    offset: number
  ): Promise<IResponse<IMeter[], number | null>> {
    try {
      const res = await axios.get(`${BASE_URL}${offset}`, config);
      const dataResult = res.data as IResponse<IMetterDTO[], string | null>;
      const converted = convertMetersData(dataResult.results);
      const previosLink = dataResult.previous?.split('offset=')[1];
      const nextLink = dataResult.next?.split('offset=')[1];
      return {
        count: dataResult.count,
        next: nextLink ? parseInt(nextLink) : null,
        previous: previosLink ? parseInt(previosLink) : null,
        results: converted,
      };
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw err;
    }
  }
  static async loadAreas(
    url: string
  ): Promise<IResponse<IArea[], string | null>> {
    try {
      const res = await axios.get(url, config);
      const dataResult = res.data as IResponse<IAreaDTO[], string | null>;

      const converted = convertAreasData(dataResult.results);

      return {
        count: dataResult.count,
        next: dataResult.next,
        previous: dataResult.previous,
        results: converted,
      };
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw err;
    }
  }
  static async loadSingleItem(
    offset: number
  ): Promise<IResponse<IMeter[], number | null>> {
    try {
      const res = await axios.get(`${BASE_URL_SINGLE}${offset}`, config);
      const dataResult = res.data as IResponse<IMetterDTO[], string | null>;
      const converted = convertMetersData(dataResult.results);
      const previosLink = dataResult.previous?.split('offset=')[1];
      const nextLink = dataResult.next?.split('offset=')[1];
      return {
        count: dataResult.count,
        next: nextLink ? parseInt(nextLink) : null,
        previous: previosLink ? parseInt(previosLink) : null,
        results: converted,
      };
    } catch (err: any) {
      if (err.response) {
        throw err.response.data;
      }
      throw err;
    }
  }
  static delete<T>(id: string): Promise<T> {
    return axios
      .delete(`${REMOVE_URL}/${id}`, config)
      .then((res: AxiosResponse) => {
        return res as T;
      })
      .catch((err: AxiosError) => {
        console.log(err);

        if (err.response) {
          throw err.response as T;
        }
        throw err;
      });
  }
}
