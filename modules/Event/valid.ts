import { NextFunction, Request, Response } from 'express';
import { Times } from '../../tools/validator/enums';
import RequestValidator from '../../tools/validator/Validator';
import { IEventCreate, IOverloadValidatePostEventGeneric, IOverloadValidatePostEventSpecific, IValidationValues } from './types';

class ValidatorEvent {
  static readonly validationValues: IValidationValues = {
    firstName: {
      min: 1,
      max: 100,
      regex: /^[a-żA-Ż]+(([',. -][a-żA-Ż ])?[a-żA-Ż]*)*$/,
    },
    lastName: {
      min: 2,
      max: 100,
      regex: /^[a-żA-Ż]+(([',. -][a-żA-Ż ])?[a-żA-Ż]*)*$/,
    },
    email: {
      min: 5,
      max: 100,
      regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    eventDate: {
      min: Date.now(),
      max: Date.now() + Times.YEAR * 100,
    }
  }
  private specificBool: boolean = false;
  private genericBool: boolean = false;

  get specific() {
    this.specificBool = true;
    return {
      postEvent: this.validatePostEvent.bind(this) as IOverloadValidatePostEventSpecific,
    };
  }

  get generic() {
    this.genericBool = true;
    return {
      postEvent: this.validatePostEvent.bind(this) as IOverloadValidatePostEventGeneric,
    };
  }
  
  private validatePostEvent(req: Request<any, any, IEventCreate>): IEventCreate;
  private validatePostEvent(req: Request<any, any, IEventCreate>, res: Response, next: NextFunction): void;
  private validatePostEvent(req: Request<any, any, IEventCreate>, res?: Response, next?: NextFunction) {
    const { firstName, lastName, email, eventDate } = req.body;
    if (this.genericBool) {
      try {
        new RequestValidator(firstName).withoutSanitation.isLength();
        new RequestValidator(lastName).withoutSanitation.isLength();
        new RequestValidator(email).withoutSanitation.isLength();
        new RequestValidator(eventDate).withoutSanitation.isInteger();
        next();
      } catch(err) {
        next(err);
      }
    }
    if (this.specificBool) {
      const validated: IEventCreate = {
        firstName: new RequestValidator<typeof firstName>(firstName)
          .withSanitation
          .trimAll()
          .isLength(ValidatorEvent.validationValues.firstName)
          .matches(ValidatorEvent.validationValues.firstName.regex).result,
        lastName: new RequestValidator<typeof lastName>(lastName)
          .withSanitation
          .trimAll()
          .isLength(ValidatorEvent.validationValues.lastName)
          .matches(ValidatorEvent.validationValues.lastName.regex)
          .result,
        email: new RequestValidator<typeof email>(email)
          .withSanitation
          .trimAll()
          .isLength(ValidatorEvent.validationValues.email)
          .isEmail()
          .result,
        eventDate: new RequestValidator<typeof eventDate>(eventDate)
          .withoutSanitation
          .isInteger(ValidatorEvent.validationValues.eventDate)
          .result,
      };
      
      return validated;
    }
  }
}

export function validatorEventFactory() {
  return new ValidatorEvent();
}
export default ValidatorEvent; 
