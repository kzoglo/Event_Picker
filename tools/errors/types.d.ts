export interface IMiddlewareError extends Error {
  status: number;
  message: string;
  data: any;
}
