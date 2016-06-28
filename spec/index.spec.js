import promiseFallback from '../es/index';

describe('promiseFallback(alternatives)', () => {
  it('should be a function', () => {
    expect(promiseFallback).toEqual(jasmine.any(Function));
  });

  describe('when "alternatives" is an empty array', () => {
    it('should reject the returned promise', done => {
      promiseFallback([]).then(done.fail, done);
    });
  });

  describe('when "alternatives" contains a function that returns a promise', () => {
    describe('and the promise is resolved', () => {
      it('should resolve the returned promise with the same value', done => {
        const alternative = () => Promise.resolve('foo');
        promiseFallback([alternative]).then(resolution => {
          expect(resolution).toBe('foo');
          done();
        }, done.fail);
      });
    });

    describe('and the promise is rejected', () => {
      it('should reject the returned promise with the same value', done => {
        const alternative = () => Promise.reject('foo');
        promiseFallback([alternative]).then(done.fail, rejection => {
          expect(rejection).toBe('foo');
          done();
        });
      });
    });
  });

  describe('when "alternatives" contains a function that does NOT return a promise', () => {
    it('should resolve the returned promise with the returned value', done => {
      const alternative = () => 'foo';
      promiseFallback([alternative]).then(resolution => {
        expect(resolution).toBe('foo');
        done();
      }, done.fail);
    });
  });

  describe('when "alternatives" contains a value that is NOT a function', () => {
    it('should resolve the returned promise with that value', done => {
      const alternative = 'foo';
      promiseFallback([alternative]).then(resolution => {
        expect(resolution).toBe('foo');
        done();
      }, done.fail);
    });
  });

  describe('when "alternatives" contains more than one value', () => {
    it('should resolve the returned promise with the first value that resolves', done => {
      const alternative1 = () => Promise.reject();
      const alternative2 = () => Promise.resolve('foo');
      const alternative3 = () => Promise.resolve('bar');
      promiseFallback([alternative1, alternative2, alternative3]).then(resolution => {
        expect(resolution).toBe('foo');
        done();
      }, done.fail);
    });

    it('should reject the returned promise if all of them reject', done => {
      const alternative1 = () => Promise.reject();
      const alternative2 = () => Promise.reject();
      const alternative3 = () => Promise.reject();
      promiseFallback([alternative1, alternative2, alternative3]).then(done.fail, done);
    });

    it('should NOT call functions that follow one that resolves', done => {
      const alternative1 = () => Promise.resolve();
      const alternative2 = jasmine.createSpy();
      const alternative3 = jasmine.createSpy();
      promiseFallback([alternative1, alternative2, alternative3]).then(() => {
        expect(alternative2).not.toHaveBeenCalled();
        expect(alternative3).not.toHaveBeenCalled();
        done();
      }, done.fail);
    });
  });
});
