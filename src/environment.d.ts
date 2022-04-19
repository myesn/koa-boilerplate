// https://stackoverflow.com/a/53981706
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      APP_NAME: string;
      PORT: number;

      // MONGODB_URL: string;

      MONGODB_CLUSTER_URL: string;
      MONGODB_DATABASE: string;
      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;
    }
  }
}
export {};
