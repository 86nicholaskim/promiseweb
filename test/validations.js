export default validations = (createPromiseWebInstance) => {
  // add actions with Array function list
  createPromiseWebInstance.flow({
    actions: [
      // fn1-1
      function validationApi1() {
        return Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();
          /*
           *  fn2-1 (Promise)
           *  fn2-2 (Promise)
           *  fn2-3 (Promise)
           */

          //fn2-1

          //fn2-2

          //fn2-3
        });
      },
      // fn1-2
      function validationApi2() {
        return Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();
        });
      },
      // fn1-3
      function validationApi3() {
        return Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();
        });
      },
    ],
  });

  // start actions
  createPromiseWebInstance.start();
};
