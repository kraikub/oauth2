import axios from 'axios';

interface IsVerifiedPayload {
  verified: boolean;
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
}

export const internalServiceApi = new InternalServiceApi()