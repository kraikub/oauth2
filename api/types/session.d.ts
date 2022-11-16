type Session = {
  uid: string;
  scope: string;
  createdAt: number;
  clientId: string;
  refreshedAt: number;
  refreshToken: string;
} | undefined