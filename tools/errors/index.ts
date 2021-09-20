export class ServerError extends Error {
  name: string;
  status: number;
  message: string;

  constructor(status: number | undefined, message: string | undefined) {
    super();
    this.name = 'ServerError';
    this.status = status ? status : 500;
    this.message = message ? message : 'Server Error';
  }
}

export class ValidationError extends Error {
  name: string;
  status: number;
  message: string;

  constructor(reqData: string, dataType: string) {
    super();
    this.name = 'ValidationError';
    this.status = 422;
    let message = dataType === 'string' ?
      `Value '${reqData}' has wrong ${dataType}` :
      `Value '${reqData}' is not of type ${dataType}`;

    if (dataType === 'string')
      message = `Value '${reqData}' has wrong ${dataType}`;
    if (dataType === 'number')
    message = `Value '${reqData}' is not of type ${dataType}`;

    this.message = message;
  }
}

export class ValidationAbsentError extends Error {
  name: string;
  status: number;
  message: string;

  constructor() {
    super();
    this.name = 'ValidationAbsentError';
    this.status = 422;
    const message = 'Value needs to be provided';
    this.message = message;
  }
}

export class ValidationLengthsError extends Error {
  name: string;
  status: number;
  message: string;

  constructor(reqData: string, dataType: string, lengths: { min: number, max: number }) {
    super();
    this.name = 'ValidationLengthsError';
    this.status = 422;
    let message: string;
    
    if (dataType === 'string')
      message = `Value '${reqData}' needs to be a string with length between ${lengths.min} and ${lengths.max}.`;
    if (dataType === 'number')
      message = `Value '${reqData}' needs to be a number between ${lengths.min} and ${lengths.max}.`;
    
    this.message = message;
  }
}

export class ValidationMatchesError extends Error {
  name: string;
  status: number;
  message: string;

  constructor(reqData: string) {
    super();
    this.name = 'ValidationMatchesError';
    this.status = 422;
    const message = `Illegal value was used in ${reqData}`;
    this.message = message;
  }
}
