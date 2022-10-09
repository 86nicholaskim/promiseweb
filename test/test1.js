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

      // create row level flat function
      return new Promise((res, rej) => {
        const lowStep = createPromiseWeb();
        // connect this Promise Object by parameter with closer,
        // ** Promise - resolve, reject default callbck
        lowStep.connect({ resolve: res, reject: rej });
        lowStep.add({
          fn: () =>
            new Promise((res, rej) => {
              setTimeout(() => {
                console.log("3-1");
                return res();
              }, 6000);
            }),
        });
        lowStep.add({
          fn: () =>
            new Promise((res, rej) => {
              setTimeout(() => {
                console.log("3-2");
                return res();
              }, 5000);
            }),
        });
        // lowstep start
        lowStep.start();
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
