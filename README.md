# promisefallback

Receives an array of functions, values or promises and returns a promise
that resolves with the first of them that resolves.
The strategies are probed in series, i.e. a later function is invoked
only after all prior strategies in the chain turned out as rejections.

## Installation

```bash
npm install promisefallback
```

## Usage

```javascript
import promiseFallback from 'promisefallback';

const promise = promiseFallback([
  Promise.reject('foo'),
  () => Promise.reject('bar'),
  () => Promise.resolve('baz')
]);

promise.then(value => assert(value === 'baz'));
```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone https://github.com/softonic/promisefallback.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
