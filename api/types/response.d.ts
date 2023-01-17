interface ApplicationResponse {
  result: Application;
}

interface GlobalResponse {
  status: boolean;
  message: string;
  payload: any;
  timestamp: Date;
}

interface CustomApiResponse<type> {
  status: boolean;
  message: string;
  payload: type;
}

interface UseCaseResult<T = any> {
  success: boolean;
  httpStatus?: number;
  internalStatus?: number;
  message?: string;
  data?: T;
}
