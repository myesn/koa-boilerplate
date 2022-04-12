import axios, { AxiosInstance } from "axios";

export default class AuthenticationClient {
  private http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.AUTHENTICATION_URL,
    });
  }

  async findByToken(token: string) {
    const response = await this.http.get<AuthenticationFindByTokenResult>(
      "/find-by-token",
      { params: { token } }
    );
    return response.data;
  }
}

export type AuthenticationFindByTokenResult = {
  /** 用户 ID */
  id: string;
};
