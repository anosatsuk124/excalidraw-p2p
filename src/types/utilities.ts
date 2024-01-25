export type Result<T, E> = Ok<T> | Err<E>;

export type Ok<T> = {
  v: T;
};

export type Err<E> = {
  e: E;
};

export const ok = <T>(v: T): Ok<T> => ({ v });

export const err = <E>(e: E): Err<E> => ({ e });

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => 'v' in r;

export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => 'e' in r;

export const unwrap = <T, E>(r: Result<T, E>): T => {
  if (isOk(r)) return r.v;
  throw r.e;
};

export const re = <T, E>(r: Result<T, E>) => ({
  ok: ok(r),
  err: err(r),
  isOk: isOk(r),
  isErr: isErr(r),
  unwrap: unwrap(r),
});
