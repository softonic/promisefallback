/**
 * Receives an array of functions, values or promises and returns a promise that resolves with the
 * first of them that resolves.
 *
 * @example
 * const promise = promiseFallback([
 *   Promise.reject('foo'),
 *   () => Promise.reject('bar'),
 *   () => Promise.resolve('baz')
 * ]);
 *
 * promise.then(value => assert(value === 'baz'));
 *
 * @param  {Array} alternatives Array of functions, values or promises
 * @return {Promise}
 */
function promiseFallback(alternatives, ...args) {
  const origCtx = this;
  return alternatives.reduce((previous, current) => {
    return previous.catch(() => {
      const value = typeof current === 'function' ?
        current.apply(origCtx, args) : current;
      return Promise.resolve(value);
    });
  }, Promise.reject());
}

export default promiseFallback;
