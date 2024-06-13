export interface IResponse<T, K> {
  count?: number;
  next: K;
  previous: K;
  results: T;
}
