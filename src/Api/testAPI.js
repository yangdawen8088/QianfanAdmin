import request from "@/utils/request.js";
export function TestAPI () {
  var baseRouter = '';// 面向的是控制器节点，可以在这里设置
  return {
    GetTestData: () => {
      return request({
        url: `${baseRouter}/TestData`,
        method: 'get'
      })
    }
  }
}