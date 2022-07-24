import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Agent as HttpAgent } from "http";

export type WrappedAxiosResponse<T> = AxiosResponse<T> & {
  unwrap(): T | undefined;
};

export class QueryManager {
  static of(config?: AxiosRequestConfig): QueryManager {
    return new QueryManager(
      axios.create({
        httpAgent: new HttpAgent({ keepAlive: true, maxTotalSockets: 10 }),
        ...config,
      })
    );
  }

  private constructor(private client: AxiosInstance) {}

  public async call<T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<WrappedAxiosResponse<T>> {
    return this.client.request<T>({ ...axiosConfig, url }).then((axiosResponse) => {
      const unwrap = () => {
        return axiosResponse.data;
      };
      return { ...axiosResponse, unwrap };
    });
  }
}

export const queryClient = QueryManager.of();
