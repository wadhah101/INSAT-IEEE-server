declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      DATABASE_URL: string;
      PICTURE_STORAGE_LOCATION: string;
      PICTURE_STORAGE_LOCATION_RAW: string;
    }
  }
}
export {};
