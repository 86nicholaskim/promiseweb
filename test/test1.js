import promiseweb, { createPromiseWeb } from "../src/promiseweb";

const { add, start, connect, flow, actionInit } = promiseweb;

/************************************************************
 *   TEST CASE 1
 *     >> using add function with Function and Promise object
 ************************************************************/

// add
add({ fn: () => console.log(1) });
add({
  fn: () =>
    new Promise((res, rej) =>
      setTimeout(() => {
        console.log(2);
        res();
      }, 2000)
    ),
});
add({ fn: () => console.log(3) });

// start
start();

// 1
// Promise {<pending>}
// 2
// 3
