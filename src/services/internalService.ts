import axios from 'axios';

interface IsVerifiedPayload {
  verified: boolean;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
}

class InternalServiceApi {
  async verifyEmail(email: string) {
    return await axios.post("/api/internal/verify-email", {
      email,
    })
  }
  async isVerified() {
    return await axios.get<CustomApiResponse<IsVerifiedPayload>>("/api/internal/is-verified")
  }

  async signUp(payload: SignupPayload) {
    return await axios.post<CustomApiResponse<any>>("/api/internal/signup", payload);
  }
}

export const internalServiceApi = new InternalServiceApi()