import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export interface Command {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  baseUrl?: string;
}

export interface RequestOption extends AxiosRequestConfig {
  queryParams?: unknown;
  body?: unknown;
  pathParams?: Record<string, string | number>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://192.168.219.118:8000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터: 인증 토큰을 헤더에 추가할 수 있습니다.
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log(config);
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 응답 인터셉터: 에러 처리 등을 추가할 수 있습니다.
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => Promise.reject(error),
    );
  }

  public async request<T>(command: Command, option: RequestOption = {}): Promise<T> {
    let { path, method, baseUrl } = command;
    const { pathParams, queryParams } = option;

    // 1) pathParam
    if (pathParams) {
      Object.entries(pathParams).forEach(([key, value]) => {
        path = path.replace(`:${key}`, String(value));
      });
    }

    // 2) queryParams 를 인코딩 없이 그대로 조립
    if (queryParams && Object.keys(queryParams).length > 0) {
      const qs = Object.entries(queryParams)
        .map(([key, val]) => `${key}=${val}`) // 인코딩 없이 key=val 형태로
        .join('&');

      path += (path.includes('?') ? '&' : '?') + qs;
    }
    const config: AxiosRequestConfig = {
      url: path,
      method,
      ...option, // timeout, header 등 기타 옵션
    };

    // baseUrl이 있는경우 오버라이딩
    if (baseUrl) {
      config.baseURL = baseUrl;
    }

    if (option.queryParams) {
      config.params = option.queryParams;
    }

    if (option.body && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      config.data = option.body;
    }
    const response = await this.axiosInstance.request(config);
    return response.data;
  }
}

export default new ApiClient();
