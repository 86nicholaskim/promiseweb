import promiseweb, { createPromiseWeb } from "../src/promiseweb";
import validations from "./validations";

const { add, start, connect, flow, actionInit } = promiseweb;

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

let asyncApiFnList = {
  validator: () =>
    new Promise((valRes, valRej) => {
      const createPromiseWebInstance = createPromiseWeb();
      // connect fn called after validations complete.
      createPromiseWebInstance.connect({ resolve: valRes, reject: valRej });
      validations(createPromiseWebInstance);
    }),

  saveApi: function saveApi() {
    return Promise((res, rej) => {
      // call api
      // call return res()
    });
  },
};

add({ name: "validator", fn: asyncApiFnList.validator });
add({ name: "saveApi", fn: asyncApiFnList.saveApi });
start();

let stepByStepPromiseAction = [{}, {}];
flow({ actions: stepByStepPromiseAction });
