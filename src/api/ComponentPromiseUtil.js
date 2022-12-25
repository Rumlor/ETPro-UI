
export default class ComponentPromiseUtil {
  
  static resolveResponse (promise,success,fail){
          promise
                  .then(resp => resp.result ? success(resp) : fail(resp))
                  .catch(failedRes => fail(failedRes))
  }
  
}