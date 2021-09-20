import validator from 'validator';
import { IValidatorOptions } from '.';
import { ValidationAbsentError, ValidationError, ValidationLengthsError, ValidationMatchesError } from '../errors/';

export default class RequestValidator<A> {
  private readonly lengthMin = 1;
  private readonly lengthMax = 1000e3;
  private readonly intMin = 1;
  private readonly intMax = 1000e13;
  private _result: A;

  /**
   * @param value - value for validation and sanitation
  */
  constructor(value: A) {
    this._result = value;
  }

  get withSanitation() {
    return {
      trimAll: this.trimAll,
    } 
  }

  get withoutSanitation() {
    return this.methodsListNoSanitation; 
  }

  private trimAll = () => {
    if(!this._result) throw new ValidationAbsentError();
    const valStr = this._result.toString();
    this._result = validator.trim(valStr) as null as A;
    return this.methodsList;
  }

  private isLength = (opts?: IValidatorOptions) => {
    if(!this._result) throw new ValidationAbsentError();
    let options = opts ?
      { min: opts.min, max: opts.max } :
      { min: this.lengthMin, max: this.lengthMax };
    const valStr = this._result.toString();
    if(!validator.isLength(valStr, options))
      throw new ValidationLengthsError(valStr, 'string', options);
    return {
      ...this.methodsListNoSanitation,
      result: this.result,
    };
  }

  private isInteger = (opts?: IValidatorOptions) => {
    if(!this._result) throw new ValidationAbsentError();
    let options = opts ?
      { min: opts.min, max: opts.max } :
      { min: this.intMin, max: this.intMax };
    const valStr = this._result.toString();
    if(!validator.isInt(valStr, options))
      throw new ValidationLengthsError(valStr, 'number', options);
    return {
      ...this.methodsListNoSanitation,
      result: this.result,
    };
  }

  private isEmail = () => {
    if(!this._result) throw new ValidationAbsentError();
    const valStr = this._result.toString();
    if(!validator.isEmail(valStr))
      throw new ValidationError(valStr, 'email');
    return {
      ...this.methodsListNoSanitation,
      result: this.result,
    };
  }

  private matches = (regex: RegExp) => {
    if(!this._result) throw new ValidationAbsentError();
    const valStr = this._result.toString();
    if(!validator.matches(valStr, regex))
      throw new ValidationMatchesError(valStr);
    return {
      ...this.methodsListNoSanitation,
      result: this.result,
    };
  }

  private methodsListNoSanitation = {
    isLength: this.isLength,
    isInteger: this.isInteger,
    isEmail: this.isEmail,
    matches: this.matches,
  }

  private methodsListSanitation = {
    trimAll: this.trimAll,
  }

  private methodsList = {
    ...this.methodsListNoSanitation,
    ...this.methodsListSanitation,
  }

  private get result() {
    return this._result;
  }
}
