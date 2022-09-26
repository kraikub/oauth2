export interface ApplicationResponse {
  result: Application;
}

export interface GlobalResponse {
  status: boolean;
  message: string;
  payload: any;
  timestamp: Date;
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
    timestamp: new Date(Date.now())
  }
}
