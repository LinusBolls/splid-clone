import type { AxiosInstance } from 'axios';

export interface RequestConfig {
  httpClient: AxiosInstance;
  baseUrl: string;
  getHeaders: () => Record<string, string>;
}
