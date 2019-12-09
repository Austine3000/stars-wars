function memoize<T extends (...args: any[]) => any>(fn: T) {
  type PromiseGeneric<P> = P extends Promise<infer G> ? G : never;
  type Promised = PromiseGeneric<ReturnType<T>>;

  const cache: { [_: string]: Promise<Promised> } = {};

  return async function(...params: Parameters<T>): Promise<Promised> {
    const args = JSON.stringify(params);
    if (args in cache) {
      var fresult: any;
      const newpromise = cache[args];
      console.log({ promise: newpromise });
      fresult = await newpromise;
      return fresult;
    }
    cache[args] = fn.apply(null, [...params]);
    const result = cache[args];
    return result;
  };
}

export default memoize;
