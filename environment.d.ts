declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      OUTPUT_QR: string;
      DATABASE_URL: string;
    }
  }
}
export {};
