// https://stackoverflow.com/a/53981706
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      APP_NAME: string;
      PORT: number;
      MONGODB_URL: string;
      AUTHENTICATION_URL: string;
    }
  }
}
export {};
