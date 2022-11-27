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