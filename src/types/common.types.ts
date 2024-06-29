export type Maybe<T> = null | undefined | T;
export type Dict<T> = { [key: string]: T };

export type FilterEntityOutput<T> = {
  result: T[];
  totalCount: number;
};
