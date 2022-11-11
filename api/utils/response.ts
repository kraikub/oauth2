export const createResponse = (status: boolean, message: string, payload: any): GlobalResponse => {
  return {
    status,
    message,
    payload,
    timestamp: new Date(Date.now())
  }
}
