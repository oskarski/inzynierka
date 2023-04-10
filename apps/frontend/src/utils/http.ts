import axios, { AxiosInstance } from 'axios';

interface HttpClientOptions {
  accessToken: string;
  onUnauthorized: () => void;
}

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    { accessToken, onUnauthorized }: HttpClientOptions
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.axiosInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          onUnauthorized();
          return Promise.reject('Unauthorized!');
        }

        return error;
      }
    );
  }

  get<ReturnType>(url: string, params?: object): Promise<ReturnType> {
    return this.axiosInstance.get(url, { params }).then((res) => res.data);
  }
}
