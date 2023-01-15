import axios from "axios";
interface MailArgs {
  code?: string;
  name?: string;
  deviceName?: string;
  ref?: string;
}

class MailService {
  public host: string;

  constructor(mailServiceHost: string | undefined) {
    if (!mailServiceHost) {
      this.host = "";
      return;
    }
    this.host = mailServiceHost;
  }

  async sendVerificationEmail(to: string, lang: string, args: MailArgs) {
    try {
      const res = await axios.post(`${this.host}/api/v1/verify-email`, {
        to,
        lang,
        ...args,
      });
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.code, error.message, error.status, {
          to,
          lang,
          ...args,
        });
      } else {
        console.error(error);
      }
    }
  }
  async sendOTP(to: string, lang: string, args: MailArgs) {
    const res = await axios.post(`${this.host}/api/v1/2fa`, {
      to,
      lang,
      ...args,
    });
    return res;
  }
}

export const mailService = new MailService(process.env.MAIL_SERVICE_HOST);
