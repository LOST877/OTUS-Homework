const fn1 = () => {
  console.log('fn1');
  return Promise.resolve(1);
};

const fn2 = () => new Promise(resolve => {
  console.log('fn2');
  setTimeout(() => resolve(2), 1000);
});

async function promiseReduce(asyncFunctions, reduce, initialValue) {
  async function promiseChain(promisesArr, elNum = 0, acc = initialValue) {
    const iterator = elNum;
    const fnResult = await promisesArr[iterator]();
    const result = reduce(acc, fnResult);
    if (iterator >= promisesArr.length - 1) {
      return result;
    } else {
      return await promiseChain(promisesArr, iterator + 1, result);
    }
  }
  const promiseRes = await promiseChain(asyncFunctions);
  return promiseRes;
};

promiseReduce([fn1, fn2], function (memo, value) {
  console.log('reduce');
  return memo * value;
}, 1)
  .then(console.log);