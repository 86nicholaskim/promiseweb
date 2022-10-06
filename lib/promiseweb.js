export const createPromiseWeb = () => {
  let list = [];
  let resolveFn;
  let rejectFn;
  let isUseLog = false;
  let location = "";

  /*************************
   *  private
   *************************/
  const __getUseLog = () => isUseLog;
  const __logger = (log) =>
    __getUseLog && location && console.log(`location: ${location}`) && log();

  /*************************
   *  public
   *************************/
  // init
  const actionInit = () => {
    list = [];
  };

  // useLog
  const useLog = () => {
    isUseLog = true;
  };

  // location
  const useLogWithLocation = (myLocation) => {
    location = myLocation;
  };

  // add
  const add = ({ name, fn }) => {
    list.push({ name, fn });
  };

  // connect
  const connect = ({ resolve, reject }) => {
    resolveFn = resolve;
    rejectFn = reject;
  };

  // start : sync_executer
  const start = () => {
    let promiseObj = list.reduce((acc, item, index, array) => {
      __logger(() => console.log(item.name || `index: ${index}`));
      return acc.then(item.fn);
    }, Promise.resolve());

    return promiseObj
      .then((result) => {
        __logger(() => console.log("last resolve, called"));
        return (resolveFn && resolveFn()) || result;
      })
      .catch((e) => {
        __logger(() => console.log("last reject, called"));
        return (rejectFn && rejectFn()) || e;
      });
  };

  // default flow
  const defualtFlow = ({ preExecute, execute }) => {
    actionInit();
    add({ name: "", fn: preExecute });
    add({ name: "", fn: execute });
  };

  // flow by Array, actions (Array)
  const flow = ({ actions }) => {
    actionInit();
    actions.forEach((act, idx) => {
      add({ name: act.name || "unknown" + idx, fn: act.fn || function () {} });
    });
  };

  return {
    add,
    useLog,
    useLogWithLocation,
    start,
    connect,
    defualtFlow,
    flow,
    actionInit,
  };
};

const promiseweb = createPromiseWeb();

export default promiseweb;
