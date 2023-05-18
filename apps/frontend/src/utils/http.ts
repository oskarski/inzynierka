import axios, { AxiosInstance } from 'axios';

interface HttpClientOptions {
  accessToken: string;
  onUnauthorized?: () => void;
}

export class HttpClient {
  private constructor(private readonly axiosInstance: AxiosInstance) {}

  static publicHttpClient(baseUrl: string): HttpClient {
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return new HttpClient(axiosInstance);
  }

  static privateHttpClient(
    baseUrl: string,
    { accessToken, onUnauthorized }: HttpClientOptions
  ): HttpClient {
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          if (onUnauthorized) onUnauthorized();
          return Promise.reject('Unauthorized!');
        }

        return Promise.reject(error);
      }
    );

    return new HttpClient(axiosInstance);
  }

  get<ReturnType>(url: string, params?: object): Promise<ReturnType> {
    return this.axiosInstance.get(url, { params }).then((res) => res.data);
  }

  post<DataType, ReturnType>(url: string, data: DataType): Promise<ReturnType> {
    return this.axiosInstance
      .post<ReturnType>(url, data)
      .then((res) => res.data);
  }

  delete<DataType = void, ReturnType = void>(
    url: string,
    data?: DataType
  ): Promise<ReturnType> {
    return this.axiosInstance
      .delete<ReturnType>(url, { data })
      .then((res) => res.data);
  }
}
