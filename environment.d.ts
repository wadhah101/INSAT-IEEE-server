declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      OUTPUT_QR: string;
      FORM_DATA: string;
      DATABASE_URL: string;
      INSCRIPTION_DATA: string;
    }
  }
}
export {};
