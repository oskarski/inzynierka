import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  get<ReturnType>(url: string): Promise<ReturnType> {
    return this.axiosInstance.get(url).then((res) => res.data);
  }
}
