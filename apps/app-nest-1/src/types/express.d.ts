declare module 'express' {
  export interface Request {
    user?: {
      id: number;
      username: string;
    };
  }
}
