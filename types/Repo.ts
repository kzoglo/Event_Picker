export interface IRepo<T> {
  create(t: T): Promise<any>;
}
