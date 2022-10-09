import promiseweb, { createPromiseWeb } from "../src/promiseweb";
import validations from "./validations";

/************************************************************
 *   TEST CASE 2
 *     >> using add, connect function for step by step with Promise object
 *     >> wait for prev Promise object resolve callback function called
 ************************************************************/

/** sample case, callbak depth
 *
 * (validations)
 *   fn1-1 (Promise)
 *      -> fn2 -1 (Promise)
 *      -> fn2 -2 (Promise)
 *      -> fn2 -3 (Promise) => call fn1-1 resolve fn
 *   fn1-2 (Promise)
 *   fn1-3 (Promise)
 *
 */
export default function test2() {
  const { add, start, connect, flow, actionInit } = promiseweb;
  let asyncApiFnList = {
    validator: () =>
      new Promise((valRes, valRej) => {
        const createPromiseWebInstance = createPromiseWeb();
        // connect fn called after validations complete.
        createPromiseWebInstance.connect({ resolve: valRes, reject: valRej });
        validations(createPromiseWebInstance);
      }),

    saveApi: function saveApi() {
      return new Promise((res, rej) => {
        // call save api after validator
        // call return res()
      });
    },
  };

  add({ name: "validator", fn: asyncApiFnList.validator });
  add({ name: "saveApi", fn: asyncApiFnList.saveApi });
  let test2Promise = start();
  test2Promise.then((result) => {}).catch((e) => {});
}
