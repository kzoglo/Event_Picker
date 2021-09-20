import { Request, Response, NextFunction } from 'express';
import { Document, Types } from 'mongoose';
import { IRepo } from '../../types/Repo';

export interface IEventCreate {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: number;
}

export interface IEventDocumentLean extends IEventCreate {
  _id: Types.ObjectId;
}

export interface IEventDocument extends IEventCreate, Document {
  _id: Types.ObjectId;
}

export interface IEventRespPostEvent {
  message: string;
}

export interface IRepoEvent extends IRepo<IEventCreate> { }

export interface IOverloadValidatePostEventGeneric {
  (req: Request<any, any, IEventCreate>, res: Response, next: NextFunction): void;
}

export interface IOverloadValidatePostEventSpecific {
  (req: Request<any, any, IEventCreate>): IEventCreate;
}

/**
 * Intersection of all posible keys
 */
type IEventAllKeys = IEventCreate;
type IValidationStructure = {
  min?: number;
  max?: number;
  regex?: RegExp;
}

export type IValidationValues = {
  [key in keyof IEventAllKeys]: IValidationStructure; 
}
