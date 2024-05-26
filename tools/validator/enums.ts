export enum Times {
  SECOND = 1000,
  MINUTE = Times.SECOND * 60,
  HOUR = Times.MINUTE * 60,
  DAY = Times.HOUR * 24,
  YEAR = Times.DAY * 365,
  ONE_HUNDRED_YEARS = new Date(Date.now()).setFullYear(new Date(Date.now()).getFullYear() + 100),
}
