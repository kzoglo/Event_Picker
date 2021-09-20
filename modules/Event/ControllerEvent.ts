import { RequestHandler } from 'express';
import RepoEvent from './RepoEvent';
import ValidatorEvent from './valid';
import { Request, Response, NextFunction } from 'express';
import { IEventCreate, IEventRespPostEvent } from './types';
import { errorValidationHandler } from '../../tools/middlewares';
import { Responses } from './enums';

class ControllerEvent {
  private _repo: RepoEvent;
  private _validator: ValidatorEvent;
  
  private get validator() {
    if(!this._validator) this._validator = new ValidatorEvent();
    return this._validator;
  }
  private get repo() {
    if(!this._repo) this._repo = new RepoEvent();
    return this._repo;
  }

  postEvent = async (req: Request<IEventCreate>, res: Response<IEventRespPostEvent>, next: NextFunction) => {
    try {
      const validated = this.validator.specific.postEvent(req);
      await this.repo.create(validated);
      res.status(201).json({ message: Responses.CREATED });
    } catch (err) {
      errorValidationHandler(err, next);
    }
  };
}

export function ControllerEventFactory() {
  return new ControllerEvent();
}
export default ControllerEvent;
