import express, { Express, Request, Response, NextFunction } from 'express';
import { ServerError } from '../errors';
import { IMiddlewareError } from '../errors/types';
import { isEqual } from '../predicates';
export * as router from "./router";

let lastRouterError: Error;

export function getLastRouterError(): Error {
  return lastRouterError;
}

export const errorValidationHandler = (err: ServerError, next: NextFunction): void => {
  if (isEqual(err.name, 'ValidationError')) {
    err.status = 422;
  }

  next(err);
};

export const errorHandling = (app: Express): void => {
  app.use((error: IMiddlewareError, req: Request, res: Response, next: NextFunction) => {
    const { status, message, data } = error;
    res.status(status).json({ message, data });
  });
}

export const setParsers = (app: Express): void => {
  app.use(express.json());
}

export const setHeaders = (app: Express): void => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS,GET,PUT,POST,PATCH,DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });
}
