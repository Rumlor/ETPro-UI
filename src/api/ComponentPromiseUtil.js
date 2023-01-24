
export default class ComponentPromiseUtil {
  /**
   * global static helper wrapper method for component callbacks that will be notified after api requests.
   * */
  static resolveResponse (promise,success,fail){
          promise
                  .then(resp => resp.result ? success(resp) : fail(resp))
                  .catch(failedRes => fail(failedRes))
  }
  
}