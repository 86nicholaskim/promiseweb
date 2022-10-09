import { createPromiseWeb } from "../lib/promiseweb";

/*
 * test case
 *  -- promiseWebInstance have prevPromise resolve callback by connect function
 *  -- createPromiseWeb can create new flow in low level
 */
export default validations = (promiseWebInstance) => {
  // add actions with Array function list
  addFlow(promiseWebInstance);

  // start actions
  promiseWebInstance
    .start()

    .then((result) => {
      // after flow actions completed(ex, validationApi3)
      console.log(
        `Nice to meet you, after start function completed 'then' function in 'validtions.js' will called.`
      );
    })
    .catch((e) => {
      // errors, while actions ( Fn Array ) execute.
      console.log(
        `Oops i'm catched error. after start function completed 'catch' function in 'validation.js' will called.`
      );
    });
};

// add actions with Array function list
function addFlow(promiseWebInstance) {
  promiseWebInstance.flow({
    actions: [
      // fn1-1
      function validationApi1() {
        return new Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();
          promiseWeb.connect({ resolve: res, reject: rej });
          /*
           *  fn2-1 (Promise)
           *  fn2-2 (Promise)
           *  fn2-3 (Promise)
           */
          promiseWeb.add({ name: "fn2_1", fn: fn2_1 });
          promiseWeb.add({ name: "fn2_2", fn: fn2_2 });
          promiseWeb.add({ name: "fn2_3", fn: fn2_3 });
          promiseWeb.start();

          // functions
          function fn2_1() {
            return () =>
              new Promise((res, rej) => {
                console.log("Hello fn2_1, are you complete?");

                // API? :)
                setTimeout(() => {
                  console.log(
                    `Hi, i'm fn2_1 result. just arrived from API Server`
                  );
                  return res();
                }, 1000);
              });
          }
          function fn2_2() {
            return () =>
              new Promise((res, rej) => {
                console.log("Hello fn2_2, are you complete?");

                // API? :)
                setTimeout(() => {
                  console.log(
                    `Hi, i'm fn2_2 result. just arrived from API Server`
                  );
                  return res();
                }, 5000);
              });
          }
          function fn2_3() {
            return () =>
              new Promise((res, rej) => {
                console.log("Hello fn2_3, are you complete?");

                // API? :)
                setTimeout(() => {
                  console.log(
                    `Hi, i'm fn2_3 result. just arrived from API Server`
                  );
                  return res();
                }, 1000);
              });
          }
        });
      },
      // fn1-2
      function validationApi2() {
        return new Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();

          // ...

          return res();
        });
      },
      // fn1-3
      function validationApi3() {
        return new Promise((res, rej) => {
          const promiseWeb = createPromiseWeb();

          // ...
          return res();
        });
      },
    ],
  });
}
