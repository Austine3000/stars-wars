// function memoize(fn: any) {
//   let cache: { [index: string]: { message: any } } = {};

//   function clear() {
//     cache = {};
//   }

//   function get() {
//     return Object.freeze(Object.assign({}, cache));
//   }

//   function count() {
//     return Object.keys(cache).length;
//   }

//   function process(dispatch: any, value: any, movies: any) {
//     const cacheKey = JSON.stringify(arguments);

//     if (cacheKey in cache) {
//       let cachedData;
//       cachedData = cache.cacheKey.then((result: any) => result)

//       return cachedData;
//     }

//     cache[cacheKey] = fn.apply(null, arguments);

//     return cache[cacheKey];
//   }

//   return Object.freeze({
//     process,
//     clear,
//     count,
//     get
//   });
// }

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
      console.log(fresult);
      return fresult;
    }
    cache[args] = fn.apply(null, [...params]);
    const result = cache[args];
    return result;
  };
}

export default memoize;
