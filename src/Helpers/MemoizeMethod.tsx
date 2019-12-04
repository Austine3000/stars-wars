function memoize(fn: any) {
  let cache: { [index: string]: { message: string } } = {};

  function clear() {
    cache = {};
  }

  function get() {
    return Object.freeze(Object.assign({}, cache));
  }

  function count() {
    return Object.keys(cache).length;
  }

  function process(dispatch: any, value: any, movies: any) {
    const cacheKey = JSON.stringify(arguments);

    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    cache[cacheKey] = fn.apply(null, arguments);

    return cache[cacheKey];
  }

  return Object.freeze({
    process,
    clear,
    count,
    get
  });
}

export default memoize;
