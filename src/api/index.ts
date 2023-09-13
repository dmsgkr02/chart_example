interface HttpClient {
  fetch: (endpoint: string, options: {}) => Promise<Response>;
}

export class HttpClientImpl implements HttpClient {
  private baseURL;
  constructor(baseURL: string | undefined) {
    this.baseURL = baseURL;
  }

  fetch(endpoint: string, options?: {}) {
    return window.fetch(`${this.baseURL}${endpoint}`, {
      ...options,
    });
  }
}

const prodApiUrl = process.env.REACT_APP_PROD_API_URL || '';
const BASE_URL = process.env.NODE_ENV === 'production' ? prodApiUrl : process.env.REACT_APP_DEV_API_URL;

export const httpClientInstanse = new HttpClientImpl(BASE_URL);
