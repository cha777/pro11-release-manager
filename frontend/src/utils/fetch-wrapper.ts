class FetchError extends Error {
  response: Response;
  data?: unknown;

  constructor(message: string, response: Response, data?: any) {
    super(message);
    this.response = response;
    this.data = data;
  }
}

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new FetchError(response.statusText, response, errorBody);
  }

  return response.json() as Promise<T>;
};
