import { Types } from 'mongoose';

type IComparableTypes = 
  number |
  string |
  Types.ObjectId |
  undefined
;
export const isEqual = (x: IComparableTypes, y: IComparableTypes): boolean => {
  return x === y;
};
