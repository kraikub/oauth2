export interface ApplicationResponse {
  result: Application;
}

export interface GlobalResponse {
  status: boolean;
  message: string;
  payload: any;
}

export interface CustomApiResponse<type> {
  status: boolean;
  message: string;
  payload: type;
}

export const createResponse = (status: boolean, message: string, payload: any): GlobalResponse => {
  return {
    status,
    message,
    payload,
  }
}
