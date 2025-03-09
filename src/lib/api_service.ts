import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class apiService {
  private axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    // 요청 인터셉터(예: 요청 전 토큰 첨부 등)
    this.axiosInstance.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    // 응답 인터셉터 (예: 공통 에러처리)
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  // GET 메서드
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data);
  }

  // POST 메서드
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then((response: AxiosResponse<T>) => response.data);
  }

  // PUT 메서드
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then((response: AxiosResponse<T>) => response.data);
  }

  // DELETE 메서드
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then((response: AxiosResponse<T>) => response.data);
  }
}

const apiRequest = new apiService({});
export default apiRequest;