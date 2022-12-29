import promiseweb, { createPromiseWeb } from "promiseweb";

/************************************************************
 *   TEST CASE 1
 *     >> using add function with Function and Promise object
 ************************************************************/

export default function test1() {
  const { add, start, connect, flow, actionInit } = promiseweb;

  // add
  add({ fn: () => console.log("1") });
  add({
    fn: () =>
      new Promise((res, rej) =>
        setTimeout(() => {
          console.log("2");
          res();
        }, 2000)
      ),
  });
  add({
    fn: () => {
      setTimeout(() => {
        console.log("3");
      }, 2000);

      return new Promise((res, rej) => {
        const innerStep = createPromiseWeb();
        // connect this Promise Object by parameter with closer,
        // ** Promise - resolve, reject default callbck
        innerStep.connect({ resolve: res, reject: rej });
        innerStep.add({
          fn: () =>
            new Promise((res, rej) => {
              setTimeout(() => {
                console.log("3-1");
                return res();
              }, 6000);
            }),
        });
        innerStep.add({
          fn: () =>
            new Promise((res, rej) => {
              setTimeout(() => {
                console.log("3-2");
                return res();
              }, 5000);
            }),
        });
        // innerStep start
        innerStep.start();
      });
    },
  });
  add({
    fn: () =>
      setTimeout(() => {
        console.log("4");
      }, 5000),
  });

  // start
  start();

  // 1
  // Promise {<pending>}
  // 2
  // 3
}
